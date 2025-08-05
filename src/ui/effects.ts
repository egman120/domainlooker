import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import ora from 'ora';

export async function displayBanner(): Promise<void> {
  console.clear();
  
  const title = figlet.textSync('DOMAIN LOOKER', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
    verticalLayout: 'fitted'
  });
  
  const gradientTitle = gradient(['#00d4ff', '#0066ff', '#003d99'])(title);
  
  console.log(boxen(gradientTitle, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    backgroundColor: 'black'
  }));
  
  console.log(chalk.yellow('🕵️  CLASSIFIED INTELLIGENCE GATHERING SYSTEM'));
}

export async function typeWriter(text: string, delay: number = 50): Promise<void> {
  for (const char of text) {
    process.stdout.write(chalk.green(char));
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  console.log();
}

export function createSpinner(text: string) {
  return ora({
    text: chalk.cyan(text),
    spinner: {
      interval: 100,
      frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    }
  });
}

export function missionComplete(message: string): void {
  console.log(boxen(
    chalk.green.bold(`✅ MISSION COMPLETE\n${message}`),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green'
    }
  ));
}

export function criticalAlert(message: string): void {
  console.log(boxen(
    chalk.red.bold(`🚨 CRITICAL ALERT\n${message}`),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'red',
      backgroundColor: 'black'
    }
  ));
}