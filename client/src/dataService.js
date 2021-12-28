import axios from "axios";

export default class DataService{

    async getData(url, method = "GET", data) {
        const response = await axios({ url, method, data,
            headers: { "Content-Type": "application/json" },
        });

        if(response) return response.data;
        else return [];
    }

    // Conversation ******************************************************************

    async addConversation(data){
        const conversation = await this.getData(`/conversation/add`, 'POST', data);
        return conversation;
    }

    async getConversations(id){
        const conversation = await this.getData(`/conversation/${id}`);
        return conversation;
    }

    async addConversationToFavorite(userId, conversationId){
        const conversation = await this.getData(`/conversation/favorite/add/${userId}/${conversationId}`);
        return conversation;
    }

    async removeConversationFromFavorite(userId, conversationId){
        const conversation = await this.getData(`/conversation/favorite/remove/${userId}/${conversationId}`);
        return conversation;
    }

    // User ******************************************************************

    async getUserById(userId){
        const user = await this.getData(`/auth/user/${userId}`);
        return user;
    }

}