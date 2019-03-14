package edu.northeastern.ccs.im.database;

public class DBConstants {

        /** DB Host name */
        protected static final String DB_HOST = "jdbc:mysql://msd-project.cgxeszufief9.us-east-1.rds.amazonaws.com/messaging";

        /** DB Username */
        protected static final String DB_USERNAME = "admin";

        /** DB Password */
        protected static final String DB_PASSWORD = "shashwat";

        /** Private constructor to prevent anyone from creating one of these. */
        private DBConstants() {/* does nothing. */}

        /**
         *
         * @return an object of serverConstants()
         * NOTE: used only for testing purpose
         */
        protected static DBConstants getServerConstant() {
            return new DBConstants();
        }
}
