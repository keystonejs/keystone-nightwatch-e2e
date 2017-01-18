# Keystone End-2-End Functional Testing Framework
The Keystone Nightwatch E2E framework (or simply KNE) is an end-2-end UI/functional testing framework for KeystoneJS and keystoneJS applications.

## Installation
`npm install keystone-nightwatch-e2e --save-dev`

## Running
Before running KNE ensure that your keystone application is up and running.
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
| --group                   | The test group to run. This is nightwatch terminology. Please see [NightwatchJS Test Runner](http://nightwatchjs.org/guide#test-runner) for on this and other options. |
| --test                    | The test to run. This is nightwatch terminology. Please see [NightwatchJS Test Runner](http://nightwatchjs.org/guide#test-runner) for on this and other options. |

Examples:
- node test/e2e/testApp.js --browser-name chrome --group test/e2e/group000
- node test/e2e/testApp.js --browser-name firefox --test test/e2e/group000/test1.js
- node test/e2e/testApp.js --env saucelabs-local --browser-name chrome --sauce-username MYUSERNAME --sauce-access-key MYACCESSKEY --group test/e2e/group000
- node test/e2e/testApp.js --env saucelabs-local --browser-name firefox --browser-version 50 --sauce-username MYUSERNAME --sauce-access-key MYACCESSKEY

NOTES on examples:
- The first example, runs the group000 tests in chrome in your localhost
- The second example, runs the group000/test1 test in firefox in your localhost
- The third example, runs the group000/test1 test in the latest version of chrome in SauceLabs
- The fourth example, runs all the e2e tests in version 50 of firefox in SauceLabs


## Overview
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
For a sample e2e test setup, please refer to the one in [KeystoneJS](https://github.com/keystonejs/keystone/tree/master/test/e2e)
that is used for testing the KeystoneJS AdminUI functionality.  Using that structure as a guide in your own application and
updating it per your application requirements is considered a reasonable approach to get started. The following is an overview
of a simple KNE test application setup:

    test/e2e
        testApp.js                              => your main test app server (requires and starts KNE)

        adminUI                                 => adminUI e2e test suite
            tests                               => directory to group all e2e tests
                group000                        => a test group (000 is the group number)
                        test1.js                => first test in test group 000
                        test2.js                => second test in test group 000
                        test3.js                => third test in test group 000
                        ...
                        testMMM.js
                ...
                groupNNN
        modelTestConfig                         => describe your application models to the test framework
           ...                                  => use the KeystoneJS e2e test ones as a guide

        models                                  => test application models
           ...                                  
