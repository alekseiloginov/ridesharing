package com.epam.ridesharing.util;

/**
 * Liquibase change log generator.
 */
public class LiquibaseMigrator {
    private static final String PG = "postgresql";
    private static final String PG_URL = "--url=jdbc:" + PG + "://localhost/ridesharing";
    private static final String PG_USERNAME = "--username=alex";
    private static final String PG_DIALECT = "org.hibernate.dialect.PostgreSQL94Dialect";
    private static final String H2 = "h2";
    private static final String H2_URL = "--url=jdbc:h2:/opt/h2/ridesharing";
    private static final String H2_USERNAME = "--username=SA";
    private static final String H2_PASSWORD = "--password=SA";
    private static final String DATA_MIGRATION_SWITCH = "--diffTypes=data";

    public static void main(String[] args) throws Exception {
        migrateFromScratch();
        // migrateEntityDiffWithSchema(); // add 'org.liquibase.ext:liquibase-hibernate5:3.6' to gradle
    }

    private static void migrateFromScratch() throws Exception {
        migrate("--changeLogFile=changelog." + H2 + ".sql",
                PG_URL, PG_USERNAME,
                // H2_URL, H2_USERNAME, H2_PASSWORD,
                // DATA_MIGRATION_SWITCH,
                "generateChangeLog");
    }

    private static void migrateEntityDiffWithSchema() throws Exception {
        migrate("--referenceUrl=hibernate:spring:com.epam.ridesharing.data.model?dialect=" + PG_DIALECT,
                "--changeLogFile=diff-changelog." + PG + ".sql",
                PG_URL, PG_USERNAME,
                "diffChangeLog");
    }

    private static void migrate(String... args) throws Exception {
        liquibase.integration.commandline.Main.main(args);
    }
}
