import dotenv from "dotenv";
import { User } from "../model/User.js";
import jsonwebtoken from "jsonwebtoken";
import { sendEmail } from "../middleware/sendEmail.js";
import cloudinary from "cloudinary";
dotenv.config();
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password both are required",
      });
    }
    const user = await User.findOne({ email, password });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password or email" });
    }
    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECERET);
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
      })
      .json({ success: true, message: "Successfully loggedin" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
      })
      .json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-email -password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMessage = `Hello,i am ${name} \n\n ${message}`;
    sendEmail(userMessage, email);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, about, skills } = req.body;
    const user = await User.findById(req.user._id);
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (skills) {
      if (skills.skill1) {
        await cloudinary.v2.uploader.destroy(user.skills.skill1.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill1, {
          folder: "portfolio",
        });
        user.skills.skill1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.skill1) {
        await cloudinary.v2.uploader.destroy(user.skills.skill1.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill1, {
          folder: "portfolio",
        });
        user.skills.skill1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.skill5) {
        await cloudinary.v2.uploader.destroy(user.skills.skill5.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill5, {
          folder: "portfolio",
        });
        user.skills.skill5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.skill4) {
        await cloudinary.v2.uploader.destroy(user.skills.skill4.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill4, {
          folder: "portfolio",
        });
        user.skills.skill4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.skill3) {
        await cloudinary.v2.uploader.destroy(user.skills.skill3.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill3, {
          folder: "portfolio",
        });
        user.skills.skill3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.skill2) {
        await cloudinary.v2.uploader.destroy(user.skills.skill2.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.skill2, {
          folder: "portfolio",
        });
        user.skills.skill2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    if (about) {
      if (about.name) {
        user.about.name = about.name;
      }
      if (about.desc) {
        user.about.desc = about.desc;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
        const cloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "portfolio",
        });
        user.about.avatar = {
          public_id: cloud.public_id,
          url: cloud.secure_url,
        };
      }
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User update successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const timeline = async (req, res) => {
  try {
    const { title, desc, date } = req.body;
    const user = await User.findById(req.user._id);
    user.timeline.unshift({
      title,
      desc,
      date,
    });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Timeline update successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const project = async (req, res) => {
  try {
    const { title, desc, image, techStack, links } = req.body;
    const user = await User.findById(req.user._id);
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.projects.unshift({
      title,
      desc,
      techStack,
      links,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Project added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { id } = req.params;
    const project = user.projects.filter((items) => {
      items._id === id;
    });
    await cloudinary.v2.uploader.destroy(project.image.public_id);
    user.projects = user.projects.filter((items) => {
      items._id !== id;
    });
    await user.save();
    req
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteTimeline = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { id } = req.params;
    user.timeline = user.timeline.filter((items) => {
      items._id !== id;
    });
    await user.save();
    req
      .status(200)
      .json({ success: true, message: "Timeline deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
