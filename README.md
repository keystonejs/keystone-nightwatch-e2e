# Keystone End-2-End Functional Testing Framework
In this README we will refer to the Keystone Nightwatch E2E framework simply as KNE.

## Installation
`npm install keystone-nightwatch-e2e --save-dev`

## Running
Before running the KNE ensure that your keystone application is up and running.
To run KNE do the following in your test application.

        var keystoneNightwatchE2e = require('keystone-nightwatch-e2e');
        keystoneNightwatchE2e.startE2E(options, done);

        where options is:

        {
            keystone: <the-keystone-instance>
        }

## Command Line Options
KNE may also be passed additional options that control its behavior:

| Option Name               | Description   |
| ------------------------- | --------------|
| --selenium-in-background  | This option tells KNE to start the selenium server manually, instead of letting Nightwatch start it. Some users in some unix-based platforms have had issues with Nightwatch starting selenium.  |
| --browser-name            | Locally on "firefox" and "chrome" are supported. Please see [SauceLab's Platform Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/) for supported browser names. |
| --browser-version         | Applies to SauceLabs runs only. Locally it will run whatever browser version is installed.  Please see [SauceLab's Platform Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/) for supported versions. You may also specify "latest". |
| --env                     | The nightwatch context to use. Should be one of:  `default`, `saucelabs-local`, `saucelabs-travis`.  If not specified, `default` is used.  For local dev testing either `default` or `saucelabs-local` should be used. `saucelabs-travis` should be reserved for travis builds. |
| --sauce-username          | The SauceLabs user name to create a secured tunnel with SauceLabs. Should be used in combination with `--env saucelabs-local` or `--env saucelabs-travis` to perform testing against SauceLabs. You need a SauceLabs account to use this option. |
| --sauce-access-key        | The SauceLabs access key to create a secured tunnel with SauceLabs. Should be used in combination with `--env saucelabs-local` or `--env saucelabs-travis` to perform testing against SauceLabs. You need a SauceLabs account to use this option. |
SauceLabs account to use this option. |
| --group                   | The test group to run. This is nightwatch terminology. Please see [NightwatchJS Test Runner](http://nightwatchjs.org/guide#test-runner) for on this and other options. |
| --test                    | The test to run. This is nightwatch terminology. Please see [NightwatchJS Test Runner](http://nightwatchjs.org/guide#test-runner) for on this and other options. |

For example:


## Overview
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


## Application Test Environment Setup
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
with this framework.  

- The models, routes, and updates you should have already define in your keystone application.
- Breaking things into groups helps with grouping functionality that may be ran together whenever a change is done to your
KeystoneJS application.  In that case, you would just test that group, instead of the entire test suite.
- In the KeystoneJS repo, we decided to separate UI and UX aspects into their own test files.  You may choose to combine the
two into a single test.
- Nightwatch uses selenium to carry on the functional testing.  As such, you may need to install appropriate drivers for the
browser you intend to test with.
