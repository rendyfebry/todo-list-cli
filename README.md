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
todos -c [init|list|add|delete|help] -t [optional]
```

```
todos -c init 			 To initialize storage
todos -c list 			 To list items
todos -c add -t "Text here" 	 To add new item
todos -c delete id 		 To delete item
todos -c help 			 For help
```

PS: If you didn't install globally, you need to change the command from `todos` to `node .`

```
node . -c list
```
