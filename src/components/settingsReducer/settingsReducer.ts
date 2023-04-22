import LanguageHandler from 'utils/LanguageHandler'
import { State, Actions, Person, Group } from './settingsReducers.model'

import { generateRandomKey, saveStateToLocalStorage } from 'utils'

const initialState: State = {
	people: [],
	groupsCount: 2,
	groups: []
}

function reducer(state: State, action: Actions): State {
	switch (action.type) {
		// Adds new person with random id and new name set by dispatch
		case 'ADD_PERSON': {
			const randomId = generateRandomKey().number
			const updatedPeople = [...state.people].concat({
				id: randomId,
				name: action.newPersonName,
				nameChanged: false
			})
			const newState = { ...state, people: updatedPeople }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Adds new person with random id and new name set programmatically
		case 'ADD_NEW_PERSON': {
			const randomId = generateRandomKey().number
			const updatedPeople = [...state.people].concat({
				id: randomId,
				name: `${LanguageHandler('Person')} ${generateRandomKey(2).string}`,
				nameChanged: false
			})
			const newState = { ...state, people: updatedPeople }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Removes person with certain person id
		case 'REMOVE_PERSON': {
			const updatedPeople = [...state.people].filter((person) => person.id !== action.removePersonId)
			const newState = { ...state, people: updatedPeople }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Removes last person
		case 'REMOVE_LAST_PERSON': {
			const updatedPeople = [...state.people].slice(0, -1)
			const newState = { ...state, people: updatedPeople }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Changes name of the person
		case 'CHANGE_NAME': {
			const updatedPeople = [...state.people].map((person) => {
				if (person.id !== action.person.id) {
					return person
				}
				return { id: person.id, name: action.person.name, nameChanged: true }
			})
			return { ...state, people: updatedPeople }
		}
		case 'CREATE_GROUPS': {
			// Number of groups to create
			const groupsCount = action.groupsCount || Math.max(state.groupsCount, Math.floor(state.people.length / 2), 2)
			// Number of people per group rounded
			const perGroup = Math.ceil((state.people.length - (state.people.length % groupsCount)) / groupsCount)
			// Number of people left after first attribution
			const peopleLeft = state.people.length % groupsCount
			// Current number of people left
			let currentPeopleLeft = peopleLeft

			// Creates empty `groups` array
			const groups = new Array(groupsCount).fill({})
			// Contains all people that have been taken to any group
			const peopleTaken: Person[] = []
			// Creates groups with people
			const groupsPopulated: Group[] = groups
				.map((_, i) => {
					// Contains people in current group
					const people: Person[] = []

					// Adds random person to `people` array
					for (let j = 0; j < perGroup; j++) {
						const randomPerson = getRandomPerson(peopleTaken)
						if (randomPerson) people.push(randomPerson)
					}

					// Returns new group
					const group: Group = { groupId: i, people: people }
					return group
				})
				// Each person left is added to the group
				.map((group) => {
					if (currentPeopleLeft <= 0) return group
					const randomPerson: Person = getRandomPerson(peopleTaken)

					currentPeopleLeft--
					return { ...group, people: [...group.people, randomPerson] }
				})

			const newState = { ...state, groups: groupsPopulated, groupsCount: groupsCount }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Sets groups count
		case 'SET_GROUP_COUNT': {
			const newState = { ...state, groupsCount: action.groupsCount }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Sets initial state
		case 'SET_INIT_STATE': {
			const updatedState = { ...state, ...action.state }
			const updatedPeopleNames = updatedState.people.map((person) => {
				if (!person.nameChanged) {
					return { ...person, name: `${LanguageHandler('Person')} ${person.name.split(' ')[1]}` }
				}
				return person
			})

			const newState = { ...updatedState, people: updatedPeopleNames }
			return newState
		}
		// Saves state to localStorage
		case 'SAVE_STATE': {
			saveStateToLocalStorage(state)
			break
		}
		// Resets state to initial
		case 'RESET_STATE': {
			saveStateToLocalStorage(initialState)
			return { ...initialState }
		}
	}
	function getRandomPerson(exception: Person[], modifyExceptionArray: boolean = true): Person {
		// Array containing people that have not been taken already
		const excludedPeople: Person[] = state.people.filter((person) => {
			// Searches for person inside of exception array
			const foundPerson = exception?.find((p) => p.id === person.id)
			return !foundPerson
		})
		// Gets random id
		const id = Math.floor(Math.random() * excludedPeople.length)
		const person = excludedPeople[id]
		if (modifyExceptionArray) exception.push(person)
		return person
	}
	return { ...state }
}

export const settingsReducer = { reducer, initialState }
