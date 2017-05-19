package com.epam;

import com.epam.ridesharing.RidesharingApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = RidesharingApplication.class, properties="classpath:application.yml")
public class ContextStartingTest {

    @Test
    public void contextLoads() {
    }

}
