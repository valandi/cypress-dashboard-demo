/// <reference types="cypress" />

describe('Testing Dynamic Content', () => {

    const testResults = {
        mismatches: 0,
        matches: 0,
        numTests: 0,
        url: null
    }

    beforeEach(() => {

        cy.eyesOpen({
            appName: 'Dynamic Content',
            testName: Cypress.currentTest.title,
        })
    })

    it('should report mismatch', () => {

        cy.visit('https://the-internet.herokuapp.com/dynamic_content')

        cy.eyesCheckWindow({
            tag: "Main page",
            target: 'window',
            fully: true
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
            throw new Error(`
                Eyes reported mismatches! ${testResults.mismatches} tests out of ${testResults.numTests} have reported failures. 
                Please check the Eyes dashboard for more details:
                ${testResults.url}
            `);
        }
    });
})