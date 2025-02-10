package com.scm.services.ServicesImpl;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.scm.services.ImageService;

@Service // ✅ Required so Spring can inject it
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;

    public ImageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile img) {
        String fileName = "img-" + UUID.randomUUID();

        try {
            var uploadResult = cloudinary.uploader().upload(img.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", fileName,
                            "resource_type", "image"));
            return (String) uploadResult.get("secure_url"); // ✅ Return Cloudinary image URL
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Image upload failed");
        }
    }
}
