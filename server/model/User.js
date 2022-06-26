import mongoose from "mongoose";
const { Schema } = mongoose;
const portfolioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      image: {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
      techStack: String,
      links: {
        live: {
          type: String,
          required: true,
        },
        github: {
          type: String,
          required: true,
        },
      },
    },
  ],
  skills: {
    skill1: {
      public_id: String,
      url: String,
    },
    skill2: {
      public_id: String,
      url: String,
    },
    skill3: {
      public_id: String,
      url: String,
    },
    skill4: {
      public_id: String,
      url: String,
    },
    skill5: {
      public_id: String,
      url: String,
    },
    skill6: {
      public_id: String,
      url: String,
    },
  },
  timeline: [
    {
      title: String,
      desc: String,
      date: Date,
    },
  ],
  about: {
    name: String,
    desc: String,
    avatar: {
      public_id: String,
      url: String,
    },
    title: String,
  },
});

export const User = mongoose.model("Portfolio", portfolioSchema);
