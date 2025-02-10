import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Earth,
  Github,
  Home,
  Image as ImageIcon,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Star,
  X
} from 'lucide-react';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showErrorToast, showSuccessToast } from '../ToastNotification';

// Form field animation variants
const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Input component with animation
const AnimatedInput = motion(forwardRef(({ label, icon: Icon, error, ...props }, ref) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {Icon && <Icon className="inline-block w-4 h-4 mr-2" />}
      {label}
    </label>
    <input
      ref={ref}
      className={`
        w-full px-3 py-2 border rounded-md 
        bg-white dark:bg-slate-800 
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        transition-all duration-200
        ${error ? ' flex border-red-500 dark:border-red-400' : ''}
      `}
      {...props}
    />
    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-red-500 dark:text-red-400 mt-1 absolute -bottom-5"
        >
          {error.message}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
)));

// Textarea component with animation
const AnimatedTextarea = motion(forwardRef(({ label, icon: Icon, error, ...props }, ref) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
      {Icon && <Icon className="inline-block w-4 h-4 mr-2" />}
      {label}
    </label>
    <textarea
      ref={ref}
      className={`
        w-full px-3 py-2 border rounded-md 
        bg-white dark:bg-slate-800 
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        transition-all duration-200
        ${error ? 'border-red-500 dark:border-red-400' : ''}
      `}
      {...props}
    />
    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-red-500 dark:text-red-400 mt-1"
        >
          {error.message}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
)));



export default function ContactForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      github: "",
      website: "",
      linkedin: "",
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showErrorToast("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("description", data.description);
      formData.append("github", data.github);
      formData.append("website", data.website);
      formData.append("linkedin", data.linkedin);
      formData.append("isFavorite", isFavorite);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:8080/api/contact/add-contact",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast("Contact added successfully!");
        reset();
        setImagePreview(null);
        setSelectedFile(null);
        setIsFavorite(false);
      } else {
        showErrorToast("Failed to add contact");
      }
    } catch (error) {
      showErrorToast("An error occurred while adding contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300"
      >
        <div className="p-6 sm:p-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Add New Contact
          </motion.h2>

          {/* {message && <span className='text-red-500'>{message}</span>} */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                <AnimatedInput
                  label="Name"
                  icon={null}
                  {...register("name",
                    { required: "Name is required !! " }
                  )}
                  error={errors.name}
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <AnimatedInput
                  label="Email"
                  type="email"
                  icon={Mail}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  error={errors.email}
                  placeholder="john@example.com"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <AnimatedInput
                  label="Phone Number"
                  icon={Phone}
                  {...register("phone", {
                    required: "Phone number is required!!",
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  error={errors.phone}
                  placeholder="1 234 567 890"
                />
              </motion.div>

              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <AnimatedTextarea
                  label="Address"
                  icon={Home}
                  {...register("address", { required: " Address is required!!" }
                  )}
                  error={errors.address}
                  placeholder="Enter full address"
                  rows={1}

                />
              </motion.div>
            </div>

            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <AnimatedTextarea
                label="Description"
                {...register("description", { required: " Description is required!!" })}
                error={errors.description}
                placeholder="Add a brief description about this contact..."
                rows={3}
              />
            </motion.div>

            <motion.div
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Social Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AnimatedInput
                  label="Website"
                  icon={Earth}
                  {...register("website")}
                  placeholder="website link"
                />
                <AnimatedInput
                  label="GitHub"
                  icon={Github}
                  {...register("github")}
                  placeholder="github link"
                />
                <AnimatedInput
                  label="LinkedIn"
                  icon={Linkedin}
                  {...register("linkedin")}
                  placeholder="linkedin link"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('image-upload').click()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <AnimatePresence>
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative inline-block mt-2"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`
                  p-2 rounded-full transition-all duration-200
                  ${isFavorite
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-300'}
                `}
              >
                <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding Contact...</span>
                  </>
                ) : (
                  <span>Add Contact</span>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}