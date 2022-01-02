import {atom} from 'recoil';

export const messages = atom({
    key: 'messages',
    default: []
})

export const isModalOpen = atom({
    key: 'isModalOpen',
    default: false
})

export const usersOnline = atom({
    key: 'usersOnline',
    default: []
})

export const isLogged = atom({
    key: 'isLogged',
    default: false
})

export const user = atom({
    key: 'user',
    default: {}
})

export const anchors = atom({
    key: 'anchors',
    default: []
})

export const conversation = atom({
    key: 'conversation',
    default: []
})