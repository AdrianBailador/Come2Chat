using System.Collections.Generic;
using System.Linq;

namespace Api.Services
{
    public class ChatService
    {
        //Key, Value, for example: { {"adri", ""2532432!@ahhhash}, {"david", ""ejejej!@ahhhash} }
        private static readonly Dictionary<string, string> Users = new Dictionary<string, string>();

        public bool AddUserToList(string userToAdd)
        {
            lock (Users)
            {
                foreach (var user in Users)
                {
                    //jOhn john
                    if(user.Key.ToLower() == userToAdd.ToLower())
                    {
                        return false;
                    }
                }
                Users.Add(userToAdd, null);
                return true;
            }
        }

        public void AddUserConnectionId(string user, string connectionId)
        {
            lock (Users)
            {
                if(Users.ContainsKey(user))
                {
                    Users[user] = connectionId;
                }
            }
        }

        public string GetUserByConnectionId(string connectionId) 
        {
            lock (Users)
            {
                return Users.Where(x=> x.Value == connectionId).Select(x=> x.Key).FirstOrDefault();
            }
        }

        public string GetUserByUser(string user)
        {
            lock (Users)
            {
                return Users.Where(x => x.Value == user).Select(x => x.Value).FirstOrDefault();
            }
        }
        public void RemoveUserFromList(string user)
        {
            lock(Users)
            {
                if (Users.ContainsKey(user))
                {
                    Users.Remove(user);
                }
            }
        }

        public string[] GetOnlineUsers()
        {
            lock (Users)
            {
                return Users.OrderBy(x => x.Key).Select(x=> x.Key).ToArray();
            }
        }
    }
}
