export type Person = {
	id: number
	name: string
}
export type Group = {
	groupId: number
	persons: Person[]
}
export interface State {
	persons: Person[]
	groupsCount: number
	groups: Group[]
}
export type Actions =
	| AddPerson
	| AddNewPerson
	| RemovePerson
	| RemoveLastPerson
	| RemoveLastPerson
	| ChangeName
	| CreateGroups
	| SetGroupCount
	| SetDefaultState
	| SaveToLocalStorage
	| ResetState
interface AddPerson {
	type: 'ADD_PERSON'
	newPersonName: string
}
interface AddNewPerson {
	type: 'ADD_NEW_PERSON'
}
interface RemovePerson {
	type: 'REMOVE_PERSON'
	removePersonId: number
}
interface RemoveLastPerson {
	type: 'REMOVE_LAST_PERSON'
}
interface ChangeName {
	type: 'CHANGE_NAME'
	person: Person
}
interface CreateGroups {
	type: 'CREATE_GROUPS'
	groupsCount: number
}
interface SetGroupCount {
	type: 'SET_GROUP_COUNT'
	groupsCount: number
}
interface SetDefaultState {
	type: 'SET_INIT_STATE'
	state: State
}
interface SaveToLocalStorage {
	type: 'SAVE_STATE'
}
interface ResetState {
	type: 'RESET_STATE'
}
