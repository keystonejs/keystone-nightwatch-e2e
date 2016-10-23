# End-2-End Functional Testing Framework
This is an overview of the end-2-end UI/functional testing framework for KeystoneJS and keystoneJS applications.  
UI/functional end-to-end tests ensure regression coverage of all aspects of a KeystoneJS application as well as
ensures that KeystoneJS itself has not regressed on the application functionality.  The tests use a real keystone
application and should do so with as much available configuration as possible.  Please note that this is not a
replacement for component-based unit testing, which attempt to do full regression coverage of all the operations 
a particular application component is responsible for.  This framework uses the [nightwatchjs.org](http://nightwatchjs.org/)
functional test framework.  Thus, if you will be contributing updates to this framework it is a good idea to have 
some familiarity with its concepts.  If all you are interested in is writing your own e2e tests for your own
application then you do not really need to become an expert in NightwatchJS but some familiarity with it is still 
greatly recommended.  Below we outline all you need to do to get started. 


## Setup
For a sample e2e test setup, please refer to the one in the KeystoneJS repo that is used for for testing  
KeystoneJS AdminUI functionality.  Using that structure in your own application and then updating it per your 
application requirements is a good first step. The following is an overview of that setup and highlights what
you may change/remove from your own setup:

    test/e2e
        global.js                               => common nightwatch test environment config

        server.js                               => keystone test app server (update per your application requirements)

        adminUI                                 => adminUI e2e test suite
            nightwatch.json                     => nightwatch config (nightwatch starts the selenium server)
            nightwatch-no-process.json          => nightwatch config (the e2e framework starts the selenium server)
            tests                               => directory to group all e2e tests
                groupNNN<group-name>            => adminUI test group, where NNN is a group sequence number (add your own groups)
                    uiTest<test-name>           => UI test suite (add your own UI tests)
                    uxTest<test-name>           => UX/functional test suite (add your own UX tests)

        drivers
            <browser drivers>                   => all required browser drivers

        frontend                                => frontend pages (you probably don't need this as you already should have these already defined)
            <page content>                      => these are your application frontend pages

        modelTestConfig                         => describe your application models to the test framework
           ...                                  => use the existing ones as guidelines

        models                                  => all application list models (you probably don't need this as you already should have these already defined)
           ...                                  

        routes                                  => frontend routes (you probably don't need this as you already should have these already defined)
            <route content>                     => these are your application frontend pages

        updates                                 => all schema update/migration files (you probably don't need this as you already should have these already defined)
           <update scripts>                     => keystone updates

## Running
Testing is a critical part of any keystone commit to ensure the commit has not introduced any
UI or functional regressions.  Make sure to run all keystone tests prior to pushing any commits.
If your commit fixes a bug but breaks the UI/functional test suite please make sure that you also
update the test suite so that any broken tests pass again.  You can run any of the following
from keystone's root directory:

    Pre-requisites:
        - Make sure that you have Firefox (or Chrome) installed.  Firefox is the default browser used.
          Using Chrome requires specifying a different --env parameter (see below).  For any tests below
          you may replace the "--env default" parameter with one of the following:

            --env chrome, if you are on a linux 64-bit system
            --env chrome-linux32, if you are on a linux 32-bit system
            --env chrome-mac32, if you are on a mac system
            --env chrome-win32, if you are on a windows system

           You'll also have to download the chrome drivers from http://www.seleniumhq.org/download/
           Once you have downloaded them, you need to save these as:

            test/e2e/drivers/chrome/linux64/chromedriver, if you are on a linux 64-bit system
            test/e2e/drivers/chrome/linux32/chromedriver, if you are on a linux 32-bit system
            test/e2e/drivers/chrome/mac32/chromedriver, if you are on a mac system
            test/e2e/drivers/chrome/win32/chromedriver, if you are on a windows system

          For browser compatibility, see http://www.seleniumhq.org/about/platforms.jsp#browsers

        - Make sure that you have a local mongo instance running.
        - Make sure that port 3000 is available; if not please tell the e2e server what port it
          should bind to.  For example, to use port 9999 do the following (in a bash shell):

            export KEYSTONEJS_PORT=9999

        - Make sure to:

            export KEYSTONE_PREBUILD_ADMIN=true

    Running in your local environment using all defaults (good to do before doing a commit):

        npm run test-e2e

    If the above npm run command does not work for you then there are some issues with selenium and some platforms.
    Try the following instead:

        npm run test-e2e-bg

    If you are in active development and just want to run a single group in your local environment:

        node test/e2e/server.js --env default --config ./test/e2e/adminUI/nightwatch.json --group test/e2e/adminUI/tests/<group>

        or, if the above doesn't work in your platform try:

        node test/e2e/server.js --env default --selenium-in-background --config ./test/e2e/adminUI/nightwatch-no-process.json --group test/e2e/adminUI/tests/<group>

    Running a single test in your local environment:

        node test/e2e/server.js --env default --config ./test/e2e/adminUI/nightwatch.json --test test/e2e/adminUI/tests/<group>/<test>

        or, if the above doesn't work in your platform try:

        node test/e2e/server.js --env default --selenium-in-background --config ./test/e2e/adminUI/nightwatch-no-process.json --test test/e2e/adminUI/tests/<group>/<test>


    Travis builds will run:

        npm run test-e2e-saucelabs

    If you want to run the e2e keystone test app server standalone then run as follows:

        export KEYSTONEJS_PORT=9999 && node test/e2e/server.js --notest

    If you want to run the e2e keystone test app server standalone without dropping the database then run as follows:

        export KEYSTONEJS_PORT=9999 && node test/e2e/server.js --notest --nodrop


    This allows you to experiment with the exact same setup the test do!


## Adding New Tests
You should consider adding new UI/UX/Functional tests if:

- you introduce new UI elements (e.g., a new field type).
- you introduce new client side functionality that may cause a different UX experience.
- you introduce new server side functionality that may cause a different UX experience.
- you fix a bug that's does not have UI/UX/Functional test coverage


## Test Organization
The best approach to keeping tests well organized is to:

- when writing new tests, use an existing one as an example.
- keep the test style consistent.
- keep the test file structure consistent.
- each test group must run on its own using the `--group` argument (that means, that each test within the group must undo
any changes it does to the state of the UI)
- each test within a group must run on its own using the `--test` argument (that means, that each test must undo
any changes it does to the state of the UI)
- when naming selectors (e.g., in adminUI.js) make sure to use a very descriptive name


## Adding Field Tests
Built-in KeystoneJS fields are tested via Field Test Objects (see lib/src/fieldTestObjects).  If and when KeystoneJS
allows creating custom fields we will provide guidelines for writing Field Test Objects on your own.  If you are adding
support for a KeystoneJS built-in field type then follow the same structure as the existing Field Test Objects. 

