import inquirer from 'inquirer';
import fs from 'fs/promises';

async function main() {
    const x = JSON.parse(await fs.readFile('story.json', 'utf-8'));

    let currentStep = x[0];

    while (currentStep) {
        console.log(' ')
        const result = await inquirer.prompt([
            {
                type: 'list',
                name: 'story',
                message: currentStep.description + '\n',
                choices: currentStep.options.map(options => options.text),
            },
        ]);
        const selectedOption = currentStep.options.find(options => options.text === result.story);
        const nextStepId = selectedOption.nextStep;
        currentStep = x.find(step => step.step === nextStepId);
    }
}

main().catch(error => console.error('Story error:', error));
