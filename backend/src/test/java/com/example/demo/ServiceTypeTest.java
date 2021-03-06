package com.example.demo;

import com.example.demo.entity.ServiceType;
import com.example.demo.repository.ServiceTypeRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ServiceTypeTest {

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Validator validator;

    @Before
    public void setup() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    //Test ผ่าน
    @Test
    public  void ServiceTypeTestPass(){
        ServiceType s = new ServiceType();
        s.setService("Home");

        try {
            entityManager.persist(s);
            entityManager.flush();

            System.out.println();
            System.out.println( "===================================================================================");
            System.out.println("Test Successfully");
            System.out.println( "===================================================================================");

        } catch(javax.validation.ConstraintViolationException e) {
            Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
            assertEquals(violations.isEmpty(), false);
            assertEquals(violations.size(), 1);

        }

    }

    //Test  Null
    @Test
    public  void ServiceTypeTestNull(){
        ServiceType s = new ServiceType();
        s.setService(null);

        try {
            entityManager.persist(s);
            entityManager.flush();

            fail("Error >>>>>>>>>>>");
        } catch(javax.validation.ConstraintViolationException e) {
            Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
            assertEquals(violations.isEmpty(), false);
            assertEquals(violations.size(), 1);
            System.out.println();
            System.out.println( "===================================================================================");
            System.out.println(e);
            System.out.println( "===================================================================================");


        }

    }

}
