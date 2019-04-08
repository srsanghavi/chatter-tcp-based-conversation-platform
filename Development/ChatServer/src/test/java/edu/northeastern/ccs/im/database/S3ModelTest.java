package edu.northeastern.ccs.im.database;

import com.amazonaws.services.s3.model.CopyObjectRequest;
import org.junit.AfterClass;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;

public class S3ModelTest {

    S3Model s3Model;

    @BeforeEach
    void setup(){
        s3Model = ModelFactory.getInstance().getS3Model();
    }

    @Test
    void testListBucket(){
        assertEquals("cs5500", s3Model.getBucket());
    }

    @Test
    void testMoveObject(){
        s3Model.moveObject("u/default.png", "u/testUser.png");
        s3Model.deleteObject("u/testUser.png");
    }

}
