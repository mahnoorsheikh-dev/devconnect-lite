// export default function AuthContext() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");  
//     if (token) {
//       api.getCurrentUser(token)
//         .then((userData) => {     
//           setUser(userData);