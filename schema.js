// MongoDB Schema for chat application

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model
const UserSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: /^\+?[1-9]\d{1,14}$/
  },
  name: {
    type: String,
    required: true
  },
  profile_picture_url: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Chat Model
const ChatSchema = new Schema({
  chat_type: {
    type: String,
    enum: ['individual', 'group'],
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);

// Message Model
const MediaAttachmentSchema = new Schema({
  media_type: {
    type: String,
    enum: ['image', 'video', 'audio', 'document'],
    required: true
  },
  file_url: {
    type: String,
    required: true
  },
  thumbnail_url: String
});

const MessageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  is_edited: {
    type: Boolean,
    default: false
  },
  edit_timestamp: Date,
  disappear_after: Number, // in seconds
  media_attachments: [MediaAttachmentSchema]
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = { User, Chat, Message };
