import { generateError } from '../../../domain/utils/helpers.js'
import { fileURLToPath } from 'url'
import MeetupService from '../../../domain/services/MeetupService.js'
import { meetupSchema } from '../schemas/meetupsSchemas.js'
import UserService from '../../../domain/services/UserService.js'
import { createPathIfNotExists } from '../../../domain/utils/helpers.js'
import sharp from 'sharp'
import crypto from 'crypto'
import path from 'path'
const userService = new UserService()
const meetupService = new MeetupService()

const randomName = (n) => crypto.randomBytes(n).toString('hex')

export const validateNewMeetup = (req, res, next) => {
  const { error } = meetupSchema.validate(req.body)

  if (error) {
    throw generateError(error.details[0].message, 400)
  }
  next()
}

export const newMeetupController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      theme,
      location,
      address,
      date,
      time,
      organizer_id,
    } = req.body

    let imageFileName

    if (req.files?.picture) {
      const currentFilePath = fileURLToPath(import.meta.url)
      const currentDir = path.dirname(currentFilePath)
      const uploadsDir = path.join(currentDir, '../', 'uploads')
      await createPathIfNotExists(uploadsDir)
      const image = sharp(req.files.picture.data)
      const fileName = req.files.picture.name
      if (
        fileName.endsWith('.jpg') ||
        fileName.endsWith('.png') ||
        fileName.endsWith('.jpeg')
      ) {
        image.resize(1024)
      } else {
        throw generateError(
          'Please make sure to upload an image in jpg, png, or jpeg format.',
          400,
        )
      }
      imageFileName = `${randomName(16)}.jpg`

      await image.toFile(path.join(uploadsDir, imageFileName))
    }

    const organizerExists = await userService.userExists(organizer_id)

    if (!organizerExists) {
      return res.status(404).json({ error: 'Organizer not found.' })
    }

    const meetupId = await meetupService.createMeetup({
      title,
      description,
      picture: imageFileName,
      theme,
      location,
      address,
      date,
      time,
      organizer_id,
    })

    res.status(200).json({ message: 'Meetup created successfully', meetupId })
  } catch (error) {
    console.error('Error creating meetup:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const listMeetupsController = async (req, res, next) => {
  try {
    const meetups = await meetupService.listMeetups()
    res.status(200).json(meetups)
  } catch (err) {
    next(err)
  }
}

export const updateMeetupController = async (req, res, next) => {
  try {
    const { id } = req.params
    const meetupData = req.body

    await meetupService.updateMeetupById(id, meetupData)

    res.status(200).json({ message: 'Meetup updated successfully.' })
  } catch (err) {
    next(err)
  }
}

export const deleteMeetupController = async (req, res, next) => {
  try {
    const { id } = req.params

    await meetupService.deleteMeetupById(id)

    res.status(200).json({ message: 'Meetup deleted successfully.' })
  } catch (err) {
    next(err)
  }
}

export const getMeetupByIdController = async (req, res, next) => {
  try {
    const { id } = req.params
    const meetup = await meetupService.getMeetupById(id)

    if (!meetup) {
      res.status(404).json({ message: 'Meetup not found.' })
    } else {
      res.status(200).json(meetup)
    }
  } catch (error) {
    next(error)
  }
}
