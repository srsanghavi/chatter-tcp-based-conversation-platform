package edu.northeastern.ccs.im.database;

/**
 * Represents a Media Connection to connect to Media stores like S3
 */
public interface MediaCon {

    /**
     * Moves object
     * @param oldFile URI of the File to be moved
     * @param newFile URI of the new File
     */
    void moveObject(String oldFile, String newFile);

    /**
     * Deletes object
     * @param file URI of the file to be deleted
     */
    void deleteObject(String file);

}
