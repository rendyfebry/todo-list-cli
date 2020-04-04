# TODO List CLI

Simple Todo List app

## Prerequisite

- Node v10.x
- NPM v6.x

## Install depedencies

```
npm install
```

## Install Package Globally

```
npm install -g .
```

## Usage

```
todos -c [add|list|delete|sync|help] -t [optional] -i [optional]
```

```
todos -c list 			 To list items
todos -c add -t "Text here" 	 To add new item
todos -c delete -i "ID" 	 To delete item
todos -c complete -i "ID" 	 To mark item complete
todos -c sync 			 To sync DB
todos -c help 			 For help
```

PS: If you didn't install globally, you need to change the command from `todos` to `node .`

```
node . -c list
```
