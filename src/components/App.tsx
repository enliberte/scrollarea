import * as React from 'react';
import ScrollArea from './ScrollArea/ScrollArea';
import ScrollAreaFixed from "./ScrollAreaFixed/ScrollAreaFixed";
import ScrollAreaWithRange from "./ScrollAreaFixedWithRange/ScrollAreaWithRange";
import './App.css';

interface User {
    id: number,
    name: string
}

const userList: Array<User> = [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'Alice'},
    {id: 3, name: 'Mira'},
    {id: 4, name: 'Sergey'},
    {id: 5, name: 'Ivan'},
    {id: 6, name: 'Max'},
    {id: 7, name: 'Anna'},
    {id: 8, name: 'Andrey'},
    {id: 9, name: 'Egor'},
    {id: 10, name: 'Svetlana'}
];


const App = () => {
    return (
        <div>
            <div id="container1">
                <ScrollArea onScrollToBottom={() => {alert('Bottom')}} onScrollToTop={() => {alert('Top')}}>
                    {userList.map(user => <div key={user.id}>{user.name}</div>)}
                </ScrollArea>
            </div>
            <div id="container2">
                <ScrollAreaFixed onScrollToBottom={() => {alert('Bottom')}} onScrollToTop={() => {alert('Top')}} fixedScrollPx={10}>
                    {userList.map(user => <div key={user.id}>{user.name}</div>)}
                </ScrollAreaFixed>
            </div>
            <div id="container3">
                <ScrollAreaWithRange onScrollToBottom={() => {alert('Bottom')}} onScrollToTop={() => {alert('Top')}} fixedScrollPx={10}>
                    {userList.map(user => <div key={user.id}>{user.name}</div>)}
                </ScrollAreaWithRange>
            </div>
        </div>

    )
};

export default App;
