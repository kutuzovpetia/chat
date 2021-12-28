import {atom} from 'recoil';


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