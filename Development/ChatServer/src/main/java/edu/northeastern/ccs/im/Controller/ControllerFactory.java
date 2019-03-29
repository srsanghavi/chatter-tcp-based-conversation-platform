package edu.northeastern.ccs.im.Controller;

/**
 * The type Controller factory.
 */
public class ControllerFactory {
    /**
     * Get user controller user controller.
     *
     * @return the user controller
     */
    public static UserController getUserController(){
        return new UserController();
    }

    /**
     * Get conversation controller conversation controller.
     *
     * @return the conversation controller
     */
    public static ConversationController getConversationController(){
        return new ConversationController();
    }

    /**
     * Get group controller group controller.
     *
     * @return the group controller
     */
    public static GroupController getGroupController(){
        return new GroupController();
    }
}
