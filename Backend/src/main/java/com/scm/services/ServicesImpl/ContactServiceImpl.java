package com.scm.services.ServicesImpl;

import com.scm.helper.ResourceNotFoundException;
import com.scm.model.Contact;
import com.scm.repositories.ContactRepo;
import com.scm.services.ContactServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service // This should be uncommented
public class ContactServiceImpl implements ContactServices {

    @Autowired
    private ContactRepo contactRepository;

    @Override
    public Contact save(Contact contact) {
        if (contact != null) {
            // save to database
            String contactId = UUID.randomUUID().toString();
            contact.setId(contactId);
            Contact savedContact = contactRepository.save(contact);
            return savedContact;
        }
        return null;
    }

    @Override
    public Contact updateContact(Contact contact) {
        if (contact != null) {
            // save to database
            Contact savedContact = contactRepository.save(contact);
            return savedContact;
        }
        return null;
    }

    @Override
    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    @Override
    public Contact getContactById(String id) {
        return contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
    }

    @Override
    public boolean deleteContactById(String id) {
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not found with the id: " + id));
        if (contact != null) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Contact> searchContact(String name, String email, String phone) {
        throw new UnsupportedOperationException("Contact");
    }

    @Override
    public List<Contact> getByUserId(String userId) {
        return contactRepository.findByUserId(userId);
    }

}
