import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Exercise } from "../types"

/**
 * Redux slice for exercise state management
 * Handles exercises, groups, search, and UI state
 */

type GroupInfo = {
  name: string
  count: number
}

type MinimalExercise = {
  id: string
  name: string
  side?: string
  slug: string
}

type SearchResult = MinimalExercise & {
  matchInfo?: {
    field: 'description' | 'equipment' | 'movementPatterns'
    matchedText: string
    context?: string
  }
}

type ExercisesState = {
  selectedId: string | null
  filterText: string
  expandedGroups: string[]
  groupBy: 'muscle' | 'equipment'
  groups: {
    muscle: {
      data: GroupInfo[]
      loading: boolean
      error: string | null
    }
    equipment: {
      data: GroupInfo[]
      loading: boolean
      error: string | null
    }
  }
  groupExercises: {
    [key: string]: {
      data: MinimalExercise[]
      loading: boolean
      error: string | null
    }
  }
  exerciseDetails: {
    [id: string]: {
      data: Exercise | null
      loading: boolean
      error: string | null
    }
  }
  searchResults: {
    data: SearchResult[]
    loading: boolean
    error: string | null
    query: string
  }
}

const initialState: ExercisesState = {
  selectedId: null,
  filterText: "",
  expandedGroups: [],
  groupBy: 'muscle',
  groups: {
    muscle: { data: [], loading: false, error: null },
    equipment: { data: [], loading: false, error: null }
  },
  groupExercises: {},
  exerciseDetails: {},
  searchResults: {
    data: [],
    loading: false,
    error: null,
    query: ''
  }
}

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    selectExercise(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload
    },
    setFilterText(state, action: PayloadAction<string>) {
      state.filterText = action.payload
    },
    toggleGroup(state, action: PayloadAction<string>) {
      const group = action.payload
      const index = state.expandedGroups.indexOf(group)
      if (index !== -1) {
        state.expandedGroups = state.expandedGroups.filter(g => g !== group)
      } else {
        state.expandedGroups.push(group)
      }
    },
    collapseAllGroups(state) {
      state.expandedGroups = []
    },
    expandAllGroups(state, action: PayloadAction<string[]>) {
      state.expandedGroups = action.payload
    },
    setGroupBy(state, action: PayloadAction<'muscle' | 'equipment'>) {
      state.groupBy = action.payload
      state.expandedGroups = []
    },
    setGroupsLoading(state, action: PayloadAction<{ type: 'muscle' | 'equipment', loading: boolean }>) {
      state.groups[action.payload.type].loading = action.payload.loading
    },
    setGroups(state, action: PayloadAction<{ type: 'muscle' | 'equipment', data: GroupInfo[] }>) {
      state.groups[action.payload.type].data = action.payload.data
      state.groups[action.payload.type].loading = false
      state.groups[action.payload.type].error = null
    },
    setGroupsError(state, action: PayloadAction<{ type: 'muscle' | 'equipment', error: string }>) {
      state.groups[action.payload.type].error = action.payload.error
      state.groups[action.payload.type].loading = false
    },
    setGroupExercisesLoading(state, action: PayloadAction<{ key: string, loading: boolean }>) {
      if (!state.groupExercises[action.payload.key]) {
        state.groupExercises[action.payload.key] = { data: [], loading: false, error: null }
      }
      state.groupExercises[action.payload.key].loading = action.payload.loading
    },
    setGroupExercises(state, action: PayloadAction<{ key: string, data: MinimalExercise[] }>) {
      state.groupExercises[action.payload.key] = {
        data: action.payload.data,
        loading: false,
        error: null
      }
    },
    setExerciseDetailsLoading(state, action: PayloadAction<{ id: string, loading: boolean }>) {
      if (!state.exerciseDetails[action.payload.id]) {
        state.exerciseDetails[action.payload.id] = { data: null, loading: false, error: null }
      }
      state.exerciseDetails[action.payload.id].loading = action.payload.loading
    },
    setExerciseDetails(state, action: PayloadAction<{ id: string, data: Exercise }>) {
      state.exerciseDetails[action.payload.id] = {
        data: action.payload.data,
        loading: false,
        error: null
      }
    },
    setSearchLoading(state, action: PayloadAction<boolean>) {
      state.searchResults.loading = action.payload
    },
    setSearchResults(state, action: PayloadAction<{ query: string, data: SearchResult[] }>) {
      state.searchResults = {
        data: action.payload.data,
        loading: false,
        error: null,
        query: action.payload.query
      }
    },
    clearSearch(state) {
      state.searchResults = {
        data: [],
        loading: false,
        error: null,
        query: ''
      }
    },
  },
})

export const { 
  selectExercise, 
  setFilterText, 
  toggleGroup, 
  collapseAllGroups, 
  expandAllGroups, 
  setGroupBy,
  setGroupsLoading,
  setGroups,
  setGroupsError,
  setGroupExercisesLoading,
  setGroupExercises,
  setExerciseDetailsLoading,
  setExerciseDetails,
  setSearchLoading,
  setSearchResults,
  clearSearch
} = exercisesSlice.actions
export default exercisesSlice.reducer