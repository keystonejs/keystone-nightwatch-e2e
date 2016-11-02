# End-2-End Functional Testing Framework
This is an overview of the end-2-end UI/functional testing framework for KeystoneJS and keystoneJS applications.
UI/functional end-to-end tests ensure regression coverage of all aspects of a KeystoneJS application as well as
ensures that KeystoneJS itself has not regressed on the application functionality.  The tests use a real keystone
application and should do so with as much available configuration as possible.  Please note that this is not a
replacement for component-based unit testing, which attempt to do full regression coverage of all the operations 
a particular application component is responsible for.  This framework uses the [nightwatchjs.org](http://nightwatchjs.org/)
functional test framework.  Thus, if you will be contributing updates to this framework it is a good idea to have 
some familiarity with its concepts.  If all you are interested in is writing your own e2e tests for your own
KeystoneJS application then you do not really need to become an expert in NightwatchJS but some familiarity with
it is still greatly recommended since you will need to control the nightwatch configuration for your tests.  Below
we outline all you need to do to get started.


## Installation
`npm install keystone-nightwatch-e2e --save-dev`


## Test Environment Setup
For a sample e2e test setup, please refer to the one in the {@link https://github.com/keystonejs/keystone/tree/master/test/e2e|KeystoneJS repo}
that is used for testing the KeystoneJS AdminUI functionality.  Using that structure as a guide in your own application and
updating it per your application requirements is considered a reasonable approach to get started. The following is an overview
of that setup and highlights what you may change in your own setup.  It may seem a bit daunting at first to take this setup on.
However, realize that it is a one time setup and one that you will run over and over to ensure your application is protected
against regressions due to either your own changes and/or changes to the keystone platform that may break your application.

    test/e2e
        global.js                               => common nightwatch test environment config

        server.js                               => keystone app server (update per your application requirements -- see notes below)

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

Notes on the setup above:
- The server.js component is most likely the one that you will need to give the most attention to.  This component needs to require/use
this framework.  The following lines in the server.js version in the keystonejs repo highlight the critical interaction 
with this framework.  The startE2E function must be done after your keystone application is up and running.  You may need to refactor your current application
server to integrate end to end testing into it.


        var keystoneNightwatchE2e = require('keystone-nightwatch-e2e');

        process.env['SELENIUM_SERVER'] = keystoneNightwatchE2e.seleniumPath;

        process.env['PAGE_OBJECTS_PATH'] = keystoneNightwatchE2e.pageObjectsPath;

        keystoneNightwatchE2e.startE2E(options, done);


- The models, routes, and updates you should have already define in your keystone application.
- Breaking things into groups helps with grouping functionality that may be ran together whenever a change is done to your
KeystoneJS application.  In that case, you would just test that group, instead of the entire test suite.
- In the KeystoneJS repo, we decided to separate UI and UX aspects into their own test files.  You may choose to combine the
two into a single test.
- Nightwatch uses selenium to carry on the functional testing.  As such, you may need to install appropriate drivers for the
browser you intend to test with.


## Running Tests
Testing is a critical part of any KeystoneJS application commit to ensure the commit has not introduced
any UI, UX, or functional regressions.  Make sure to run all functional tests prior to pushing any commits.
And please note that a regression may be reflected either in your own application and/or in KeystoneJS itself.
If your commit fixes a bug that in turn breaks the UI/UX functional test suite please make sure that you also
update the test suite so that any broken tests pass again.  If your application changes discover any issues in
KeystoneJS itself make sure to please open an issue in the KeystoneJS repo so it may get addressed.  The following
are notes about running your test suite from your application's root directory:

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

        - KeystoneJS currently makes a decision about whether to optimize for fast application service startup or
        fast admin UI application access.  We recommended that you optimize for the latter (fast admin UI application
        access).  To do so  you can do the following before starting your test suite::

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

- you introduce new UI elements (e.g., a new model).
- you introduce new client side functionality that may cause a different UI/UX experience.
- you introduce new server side functionality that may cause a different UI/UX experience.
- you fix a bug that's does not have UI/UX/Functional test coverage


## Test Organization
The best approach to keeping tests well organized is to:

- when writing new tests, keep it consistent and use an existing one as an example following the same style.
- each test group must run on its own using the `--group` argument (that means, that each test within the group must undo
any changes it does to the state of the UI)
- each test within a group must run on its own using the `--test` argument (that means, that each test must undo
any changes it does to the state of the UI)


## Adding Field Test Objects
Built-in KeystoneJS fields are tested via Field Test Objects (see lib/src/fieldTestObjects).  If you are adding
support for a new KeystoneJS field type then follow the same structure as the existing Field Test Objects. 
