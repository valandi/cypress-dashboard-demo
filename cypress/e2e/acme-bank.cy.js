/// <reference types="cypress" />

describe('ACME Bank', () => {

    const testResults = {
        mismatches: 0,
        matches: 0,
        numTests: 0,
        url: null
    }

    beforeEach(() => {

        cy.eyesOpen({
            appName: 'ACME Bank',
            testName: Cypress.currentTest.title,
        })
    })

    it('should log into a bank account', () => {

        cy.visit('https://demo.applitools.com')

        cy.eyesCheckWindow({
            tag: "Login page",
            target: 'window',
            fully: true
        });

        cy.get('#username').type('andy')
        cy.get('#password').type('i<3pandas')
        cy.get('#log-in').click()

        cy.eyesCheckWindow({
            tag: "Main page",
            target: 'window',
            fully: true,
            matchLevel: 'Layout'
        });
        cy.eyesClose();
    });

    afterEach(() => {
        cy.eyesGetAllTestResults().then((summary) => {
            console.dir(summary);
            console.log(summary);
            cy.log(summary);
            for (const result of summary.getAllResults()) {
                let testResult = result.getTestResults();
                cy.log(testResult);
                console.dir(testResult);  
                if (!testResults.url) testResults.url = testResult.getUrl();
                testResults.matches += testResult.matches;   
                testResults.mismatches += testResult.mismatches;
                testResults.numTests += 1;
            }
        });
    });
    after(() => {
        if (testResults.matches <= testResults.numTests) {
            expect("Tests failed:").to.equal(testResults.url);
        }
    });
})