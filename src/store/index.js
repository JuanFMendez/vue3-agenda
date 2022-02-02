import moment from 'moment'
import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        daySelected: '',
        tarea: {
            id: null,
            nombre: '',
            descripcion: '',
            estado: '',
            dia: '',
            horas: []
        },
        tareas: [],
        tareasCompletas: [],
        tareasPendientes: [],
        tareasEsperando: [],
        tareasEnCurso: [],
        tareasPorDia: [],
        estados: [],
        horasDisponibles: [],
        horasBloqueadas: [{}],
        tipoOperacion: ''
    },
    mutations: {
        setDaySelected(state, payload) {
            state.daySelected = payload
        },
        updateHoursSelected(state, payload) {
            state.horasDisponibles = payload
        },
        clearTask(state) {
            state.tarea = {
                id: null,
                nombre: '',
                descripcion: '',
                estado: '',
                dia: '',
                horas: []
            }
        },
        setTask(state, payload) {
            state.tarea = payload
        },
        clearTasks(state) {
            state.tareas = []
        },
        setAllTask(state, payload) {
            state.tareas = payload
        },
        setFilteredTask(state) {

            state.tareasCompletas = []
            state.tareasPendientes = []
            state.tareasEsperando = []
            state.tareasEnCurso = []

            /** INDICE : test de trabajo con objetos */
            if (state.tareas !== null) {
                Object.entries(state.tareas).forEach(([keyDia, dia]) => {
                    Object.entries(dia).forEach(([key, tarea]) => {
                        if ('Completa' === tarea.estado) {
                            state.tareasCompletas.push({ "dia": keyDia, "tarea": tarea })
                        }
                        if ('Pendiente' === tarea.estado) {
                            state.tareasPendientes.push({ "dia": keyDia, "tarea": tarea })
                        }
                        if ('Esperando' === tarea.estado) {
                            state.tareasEsperando.push({ "dia": keyDia, "tarea": tarea })
                        }
                        if ('En curso' === tarea.estado) {
                            state.tareasEnCurso.push({ "dia": keyDia, "tarea": tarea })
                        }
                    })
                })
            }
        },
        setDayTask(state, payload) {
            state.tareasPorDia = payload;
        },
        clearDayTask(state) {
            state.tareasPorDia = []
        },
        clearStates(state) {
            state.estados = []
        },
        clearHoursAvailables(state) {
            state.horasDisponibles = []
        },
        setStates(state, payload) {
            state.estados = payload
        },
        setHoursAvailables(state, payload) {
            state.horasDisponibles = payload
        },
        setHoursSelected(state, payload) {
            state.tarea.horas = payload
        },
        setHoursOcupped(state, payload) {
            state.horasBloqueadas = payload
        },
        setTipoOperacion(state, payload) {
            state.tipoOperacion = payload
        }
    },
    actions: {

        setDaySelected({ commit }, payload) {
            commit('setDaySelected', payload)
        },
        updateHoursSelected({ commit }, payload) {
            commit('updateHoursSelected', payload)
        },
        filterTaskForDay({ commit, state }, payload) {
            const taskForDay = []
                /** INDICE : test de trabajo con objetos */
            if (state.tareas !== null) {
                Object.entries(state.tareas).forEach(([keyDia, dia]) => {
                    Object.entries(dia).forEach(([id, tarea]) => {
                        if (keyDia == payload) {
                            taskForDay.push(tarea)
                        }
                    })
                })
            }
            commit('setDayTask', taskForDay)
        },
        setTask({ commit }, payload) {
            commit('clearTask')
            commit('setTask', payload)
            router.push({ path: '/management' })
        },
        setHoursSelected({ commit }, payload) {
            commit('setHoursSelected', payload)
        },
        async getAllTask({ commit }) {
            commit('clearTask')
            commit('clearTasks')
            commit('clearDayTask')
            try {
                const res = await fetch(`https://agenda2-4bba7-default-rtdb.europe-west1.firebasedatabase.app/agenda/tareas.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const dataDB = await res.json()
                commit('setAllTask', dataDB)
                commit('setFilteredTask')
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        async saveOrUpdate({ commit }, payload) {
            //generamos id en caso de que sea creacion
            if (payload.id === undefined || payload.id == '' || payload.id == null) {
                payload.id = Math.random().toString(36).substr(2, 18);
                commit('setTipoOperacion', 'creacion')
            } else {
                commit('setTipoOperacion', 'edicion')
            }
            //ordenar horas
            payload.horas.sort()

            try {
                const res = await fetch(`https://agenda2-4bba7-default-rtdb.europe-west1.firebasedatabase.app/agenda/tareas/${payload.dia}/${payload.id}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                const dataDB = await res.json()
                commit('clearTask')
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        async deleteTask({ commit }, payload) {
            try {
                const res = await fetch(`https://agenda2-4bba7-default-rtdb.europe-west1.firebasedatabase.app/agenda/tareas/${payload.dia}/${payload.id}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const dataDB = await res.json()
                commit('clearTask')
                commit('setTipoOperacion', 'eliminacion')
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        async getAllState({ commit }) {
            commit('clearStates')
            try {
                const res = await fetch(`https://agenda2-4bba7-default-rtdb.europe-west1.firebasedatabase.app/agenda/estados.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const dataDB = await res.json()
                commit('setStates', dataDB)
            } catch (error) {
                console.log(error)
            }
        },
        async getAllHoursAvailables({ commit }) {
            commit('clearHoursAvailables')
            try {
                const res = await fetch(`https://agenda2-4bba7-default-rtdb.europe-west1.firebasedatabase.app/agenda/Horario.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const dataDB = await res.json()
                commit('setHoursAvailables', dataDB)
            } catch (error) {
                console.log(error)
            }
        },
        getHoursOcupped({ commit, state }, payload) {
            const tareas = state.tareasPorDia;
            const tareasHourBlock = [];
            if (payload.value !== undefined && payload.value !== '') {
                /** INDICE : test de trabajo con JSON --> opcion mas facil de mantener */
                const stringTareas = JSON.stringify(tareas)
                const jsonTareas = JSON.parse(stringTareas)
                for (let i = 0; i < jsonTareas.length; i++) {
                    let block = { id: jsonTareas[i].id, horas: jsonTareas[i].horas }
                    tareasHourBlock.push(block)
                }
            }
            commit('setHoursOcupped', tareasHourBlock)
        },
        setTypeOperation({ commit }, payload) {
            commit('setTipoOperacion', payload)
        }
    },
    getters: {

        getTask(state) {
            return state.tarea
        },
        getTasks(state) {
            return state.tareas
        },
        getDaySelected(state) {
            if (state.daySelected === "" || state.daySelected === "Invalid date") {
                return moment(new Date()).format('DD-MM-YYYY')
            }
            return state.daySelected
        },
        getTaskComplete(state) {
            return state.tareasCompletas
        },
        getTaskSlope(state) {
            return state.tareasPendientes
        },
        getTaskWaiting(state) {
            return state.tareasEsperando
        },
        getTaskInProgress(state) {
            return state.tareasEnCurso
        },
        getTaskDay(state) {
            return state.tareasPorDia
        },
        getStates(state) {
            return state.estados
        },
        getHoursAvailables(state) {
            return state.horasDisponibles
        },
        getHoursBloqued(state) {
            return state.horasBloqueadas
        },
        getHoursSelected(state) {
            return state.tarea.horas
        },
        getTipoOperacion(state) {
            return state.tipoOperacion
        }
    },
    modules: {}
})