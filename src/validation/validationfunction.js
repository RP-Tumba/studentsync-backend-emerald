
import Joi from "joi";

const today = new Date(); 

const studentvalidation = Joi.object({
  first_name: Joi.string().required().min(2).max(100),
  last_name: Joi.string().required().min(2).max(100),
  student_id: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  date_of_birth: Joi.date()
    .required()
    .less(today)
    .message({ "date.less": "Date of Birth must be a past date." })
    .iso(),
  contact_number: Joi.string().required().min(2).max(20),
  enrollment_date: Joi.date().required().iso(),
  profile_picture: Joi.string().uri().optional(),
});

export default studentvalidation;