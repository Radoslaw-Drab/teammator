import { State, Actions, Person, Group } from './settingsReducers.model'

import { saveStateToLocalStorage } from 'utils'

const initialState: State = {
	persons: [],
	groupsCount: 2,
	groups: []
}

function reducer(state: State, action: Actions): State {
	switch (action.type) {
		// Adds new person with random id and new name set by dispatch
		case 'ADD_PERSON': {
			const randomId = Math.round(Math.random() * 1000)
			const updatedPersons = [...state.persons].concat({ id: randomId, name: action.newPersonName })
			const newState = { ...state, persons: updatedPersons }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Adds new person with random id and new name set programmatically
		case 'ADD_NEW_PERSON': {
			const randomId = Math.round(Math.random() * 1000)
			const updatedPersons = [...state.persons].concat({
				id: randomId,
				name: `Person ${randomId}`
			})
			const newState = { ...state, persons: updatedPersons }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Removes person with certain person id
		case 'REMOVE_PERSON': {
			const updatedPersons = [...state.persons].filter((person) => person.id !== action.removePersonId)
			const newState = { ...state, persons: updatedPersons }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Removes last person
		case 'REMOVE_LAST_PERSON': {
			const updatedPersons = [...state.persons].slice(0, -1)
			const newState = { ...state, persons: updatedPersons }
			saveStateToLocalStorage(newState)
			return newState
		}
		// Changes name of the person
		case 'CHANGE_NAME': {
			const updatedPersons = [...state.persons].map((person) => {
				if (person.id !== action.person.id) {
					return person
				}
				return { id: person.id, name: action.person.name }
			})
			return { ...state, persons: updatedPersons }
		}
		case 'CREATE_GROUPS': {
			// Number of groups to create
			const groupsCount = action.groupsCount || Math.max(state.groupsCount, Math.floor(state.persons.length / 2), 2)
			// Number of people per group rounded
			const perGroup = Math.ceil((state.persons.length - (state.persons.length % groupsCount)) / groupsCount)
			// Number of people left after first attribution
			const peopleLeft = state.persons.length % groupsCount
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
					const group: Group = { groupId: i, persons: people }
					return group
				})
				// Each person left is added to the group
				.map((group) => {
					if (currentPeopleLeft <= 0) return group
					const randomPerson: Person = getRandomPerson(peopleTaken)

					currentPeopleLeft--
					return { ...group, persons: [...group.persons, randomPerson] }
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
			return { ...state, ...action.state }
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
		const excludedPeople: Person[] = state.persons.filter((person) => {
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
