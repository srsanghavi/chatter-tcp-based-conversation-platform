package edu.northeastern.ccs.im.database;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.CopyObjectRequest;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import edu.northeastern.ccs.im.ChatLogger;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.List;

public class S3Model implements MediaCon{

    private static final String VALUE = "value";
    private AmazonS3 s3;
    private String access_id;
    private String secret_access_key;
    private static String bucket = "cs5500";


    private void setS3Conf(){
        try {
            File dbFile = new File("src/main/java/edu/northeastern/ccs/im/database/s3.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dbBuilder = dbFactory.newDocumentBuilder();
            Document dbDoc = dbBuilder.parse(dbFile);

            access_id = dbDoc.getElementsByTagName("access").item(0).getAttributes().getNamedItem(VALUE).getNodeValue();
            secret_access_key = dbDoc.getElementsByTagName("secret").item(0).getAttributes().getNamedItem(VALUE).getNodeValue();

        }catch (Exception e){
            ChatLogger.error(e.getMessage());
        }
    }

    public S3Model(){
        setS3Conf();
        final BasicAWSCredentials creds = new BasicAWSCredentials(access_id, secret_access_key);
        s3 = AmazonS3Client.builder()
                .withRegion("us-east-1")
                .withCredentials(new AWSStaticCredentialsProvider(creds))
                .build();
    }

    public String getBucket(){

        List<Bucket> buckets = s3.listBuckets();
        return buckets.get(0).getName();
    }

    public void moveObject(String oldFile, String newFile){

        System.out.println(oldFile);
        System.out.println(newFile);

        CopyObjectRequest cor = new CopyObjectRequest(bucket, oldFile, bucket, newFile);
        cor.withCannedAccessControlList(CannedAccessControlList.PublicRead);
        s3.copyObject(cor);
    }

    public void deleteObject(String file){
        DeleteObjectRequest dor = new DeleteObjectRequest(bucket, file);
        s3.deleteObject(dor);
    }
}
