package edu.northeastern.ccs.im.database;

import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import java.util.List;

public class S3Model {

    public String getBucket(){
        final AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
        s3.setRegion(Region.getRegion(Regions.US_EAST_1));
        List<Bucket> buckets = s3.listBuckets();
        return buckets.get(0).getName();
    }
}
