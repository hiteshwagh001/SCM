package com.scm.services;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImage(MultipartFile img);

    // String getUrlFromPublicId(String publicId);
}
