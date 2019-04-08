package edu.northeastern.ccs.im.database;

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

}
