const displayMessge = 'broken-shell';
let currentDirectory = '~';

const homeDirectories = ['a', 'b', 'c'];

const executeEcho = function (args) {
  return args.join(' ');
}

const executeMkdir = function (args) {
  const directoryToMake = args.join(' ');

  if (isDirectoryFound(directoryToMake)) {
    return 'mkdir: ' + directoryToMake + ': File exists: ';
  }

  homeDirectories.push(directoryToMake);
  return 'mkdir: ' + directoryToMake + ': directory created';
}

const isDirectoryFound = function (givenDirectory) {
  return homeDirectories.some((presentDirectory) =>
    givenDirectory === presentDirectory);
}

const executeCd = function (args) {
  const directoryToChange = args.join(' ');

  if (!isDirectoryFound(directoryToChange)) {
    return 'cd: no such directory: ' + directoryToChange;
  }

  currentDirectory = directoryToChange;
}

const executeRmdir = function (args) {
  const directoryToRemove = args.join(' ');

  if (!isDirectoryFound(directoryToRemove)) {
    return 'rmdir: ' + directoryToRemove + ': File does not exists: ';
  }

  homeDirectories.splice(homeDirectories.indexOf(directoryToRemove), 1);
}

const executeLs = function () {
  return homeDirectories.join(' ');
}

const executeCommand = function (command, args) {
  switch (command) {
    case 'echo': return executeEcho(args);
    case 'cd': return executeCd(args);
    case 'ls': return executeLs();
    case 'mkdir': return executeMkdir(args);
    case 'rmdir': return executeRmdir(args);

    default: return 'Broken Command: \'' + command + '\'';
  }
}

const promptMessage = function () {
  return displayMessge + ' ' + currentDirectory + ' %';
}

const displayResult = function (result) {
  if (result === undefined) {
    return;
  }

  console.log(result);
}

const runBrokenShell = function () {
  while (true) {
    const input = prompt(promptMessage());
    const [command, ...args] = input.split(' ');
    displayResult(executeCommand(command, args));
  }
}

runBrokenShell();