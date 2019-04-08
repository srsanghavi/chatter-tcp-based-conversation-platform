package edu.northeastern.ccs.im.database;

/**
 * The type Model factory.
 */
public class ModelFactory {

    private static ModelFactory modelFactory = null;
    private static DataCon conn = new MysqlCon();

    private ModelFactory() {
        conn = new MysqlCon();
    }

    public static ModelFactory getInstance(){
        if (modelFactory == null){
            modelFactory = new ModelFactory();
        }
        return modelFactory;
    }

    /**
     * Get user model user model.
     *
     * @return the user model
     */
    public static UserModel getUserModel(){
        return new UserModel(conn);
    }

    /**
     * Get conversation model conversation model.
     *
     * @return the conversation model
     */
    public static ConversationModel getConversationModel(){
        return new ConversationModel(conn);
    }

    /**
     * Get group model group model.
     *
     * @return the group model
     */
    public static GroupModel getGroupModel(){
        return new GroupModel(conn);
    }

    /**
     * Get message model message model.
     *
     * @return the message model
     */
    public static MessageModel getMessageModel(){
        return new MessageModel(conn);
    }

    public static S3Model getS3Model(){ return new S3Model();}
}
