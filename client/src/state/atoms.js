import {atom} from 'recoil';

const c = [
    {id: '001', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'Hell Boy'},
    {id: '002', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 2'},
    {id: '003', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 3'},
    {id: '004', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 4'}
];


export const anchors = atom({
    key: 'anchors',
    default: []
})

export const conversation = atom({
    key: 'conversation',
    default: c
})