export interface AssemblyConstituency {
  number: number;
  name: string;
  district: string;
  type: 'General' | 'SC' | 'ST';
  mla: string;
  party: string;
  parliamentaryConstituency: string;
  source: string;
}

// Authoritative 234 Assembly Constituencies of Tamil Nadu
// Published 2026 Assembly Election Results (Election Commission of India)
export const ASSEMBLY_CONSTITUENCIES: AssemblyConstituency[] = [
  // 1. Tiruvallur
  { number: 1, name: 'Gummidipoondi', district: 'Tiruvallur', type: 'General', mla: 'S. Vijayakumar', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 2, name: 'Ponneri', district: 'Tiruvallur', type: 'SC', mla: 'Dr. Ravi M.S.', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 3, name: 'Tiruttani', district: 'Tiruvallur', type: 'General', mla: 'G. Hari', party: 'ADMK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  { number: 4, name: 'Thiruvallur', district: 'Tiruvallur', type: 'General', mla: 'Dr. T. Arunkumar', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 5, name: 'Poonamallee', district: 'Tiruvallur', type: 'SC', mla: 'Prakasam R.', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 6, name: 'Avadi', district: 'Tiruvallur', type: 'General', mla: 'R. Ramesh Kumar', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 7, name: 'Maduravoyal', district: 'Tiruvallur', type: 'General', mla: 'Rhevanth Charan', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  { number: 8, name: 'Ambattur', district: 'Tiruvallur', type: 'General', mla: 'Balamurugan G.', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  { number: 9, name: 'Madavaram', district: 'Tiruvallur', type: 'General', mla: 'M.L. Vijayprabhu', party: 'TVK', parliamentaryConstituency: 'Thiruvallur (SC)', source: 'Election Commission of India' },
  { number: 10, name: 'Thiruvottiyur', district: 'Tiruvallur', type: 'General', mla: 'Senthil Kumar N.', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  // 2. Chennai
  { number: 11, name: 'Dr. Radhakrishnan Nagar', district: 'Chennai', type: 'General', mla: 'N. Marie Wilson', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  { number: 12, name: 'Perambur', district: 'Chennai', type: 'General', mla: 'C. Joseph Vijay', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  { number: 13, name: 'Kolathur', district: 'Chennai', type: 'General', mla: 'V.S. Babu', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  { number: 14, name: 'Villivakkam', district: 'Chennai', type: 'General', mla: 'Aadhav Arjuna', party: 'TVK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 15, name: 'Thiru-Vi-Ka Nagar', district: 'Chennai', type: 'SC', mla: 'M.R. Pallavi', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  { number: 16, name: 'Egmore', district: 'Chennai', type: 'SC', mla: 'Rajmohan', party: 'TVK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 17, name: 'Royapuram', district: 'Chennai', type: 'General', mla: 'K.V. Vijay Damu', party: 'TVK', parliamentaryConstituency: 'Chennai North', source: 'Election Commission of India' },
  { number: 18, name: 'Harbour', district: 'Chennai', type: 'General', mla: 'P.K. Sekarbabu', party: 'DMK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 19, name: 'Chepauk-Thiruvallikeni', district: 'Chennai', type: 'General', mla: 'Udhayanidhi Stalin', party: 'DMK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 20, name: 'Thousand Lights', district: 'Chennai', type: 'General', mla: 'Prabhakar J.C.D.', party: 'ADMK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 21, name: 'Anna Nagar', district: 'Chennai', type: 'General', mla: 'V.K. Ramkumar', party: 'TVK', parliamentaryConstituency: 'Chennai Central', source: 'Election Commission of India' },
  { number: 22, name: 'Virugampakkam', district: 'Chennai', type: 'General', mla: 'Sabarinathan R.', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  { number: 23, name: 'Saidapet', district: 'Chennai', type: 'General', mla: 'Arul Prakasam M.', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  { number: 24, name: 'Thiyagarayanagar', district: 'Chennai', type: 'General', mla: 'Anand N.', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  { number: 25, name: 'Mylapore', district: 'Chennai', type: 'General', mla: 'Venkataramanan P.', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  { number: 26, name: 'Velachery', district: 'Chennai', type: 'General', mla: 'Kumar R.', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  // 3. Chengalpattu
  { number: 27, name: 'Sholinganallur', district: 'Chengalpattu', type: 'General', mla: 'ECR P. Saravanan', party: 'TVK', parliamentaryConstituency: 'Chennai South', source: 'Election Commission of India' },
  { number: 28, name: 'Alandur', district: 'Chengalpattu', type: 'General', mla: 'M. Harish', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  // 4. Kanchipuram
  { number: 29, name: 'Sriperumbudur', district: 'Kanchipuram', type: 'SC', mla: 'Thennarasu K.', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  // 5. Chengalpattu
  { number: 30, name: 'Pallavaram', district: 'Chengalpattu', type: 'General', mla: 'J. Kamatchi', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  { number: 31, name: 'Tambaram', district: 'Chengalpattu', type: 'General', mla: 'D. Sarathkumar', party: 'TVK', parliamentaryConstituency: 'Sriperumbudur', source: 'Election Commission of India' },
  { number: 32, name: 'Chengalpattu', district: 'Chengalpattu', type: 'General', mla: 'S. Thiyagarajan', party: 'TVK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  { number: 33, name: 'Thiruporur', district: 'Chengalpattu', type: 'General', mla: 'B. Vijayaraj', party: 'TVK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  { number: 34, name: 'Cheyyur', district: 'Chengalpattu', type: 'SC', mla: 'Rajasekar E.', party: 'ADMK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  { number: 35, name: 'Madurantakam', district: 'Chengalpattu', type: 'SC', mla: 'Maragatham Kumaravel K.', party: 'ADMK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  // 6. Kanchipuram
  { number: 36, name: 'Uthiramerur', district: 'Kanchipuram', type: 'General', mla: 'Munirathinam J.', party: 'TVK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  { number: 37, name: 'Kancheepuram', district: 'Kanchipuram', type: 'General', mla: 'R.V. Ranjithkumar', party: 'TVK', parliamentaryConstituency: 'Kancheepuram (SC)', source: 'Election Commission of India' },
  // 7. Ranipet
  { number: 38, name: 'Arakkonam', district: 'Ranipet', type: 'SC', mla: 'V. Gandhiraj', party: 'TVK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  { number: 39, name: 'Sholinghur', district: 'Ranipet', type: 'General', mla: 'G. Kapil', party: 'TVK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  // 8. Vellore
  { number: 40, name: 'Katpadi', district: 'Vellore', type: 'General', mla: 'Dr. M. Sudhakar', party: 'TVK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  // 9. Ranipet
  { number: 41, name: 'Ranipet', district: 'Ranipet', type: 'General', mla: 'Thahira', party: 'TVK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  { number: 42, name: 'Arcot', district: 'Ranipet', type: 'General', mla: 'S.M. Sukumar', party: 'ADMK', parliamentaryConstituency: 'Arakkonam', source: 'Election Commission of India' },
  // 10. Vellore
  { number: 43, name: 'Vellore', district: 'Vellore', type: 'General', mla: 'M.M. Vinoth Kannan', party: 'TVK', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  { number: 44, name: 'Anaikattu', district: 'Vellore', type: 'General', mla: 'D. Velazhagan', party: 'ADMK', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  { number: 45, name: 'Kilvaithinankuppam', district: 'Vellore', type: 'SC', mla: 'Thenral Kumar E.', party: 'TVK', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  { number: 46, name: 'Gudiyattam', district: 'Vellore', type: 'SC', mla: 'K. Sindu', party: 'TVK', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  // 11. Tirupathur
  { number: 47, name: 'Vaniyambadi', district: 'Tirupathur', type: 'General', mla: 'Syed Farooq Basha SSB', party: 'IUML', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  { number: 48, name: 'Ambur', district: 'Tirupathur', type: 'General', mla: 'Vilwanathan A.C.', party: 'DMK', parliamentaryConstituency: 'Vellore', source: 'Election Commission of India' },
  { number: 49, name: 'Jolarpet', district: 'Tirupathur', type: 'General', mla: 'Veeramani K.C.', party: 'ADMK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  { number: 50, name: 'Tirupattur', district: 'Tirupathur', type: 'General', mla: 'Dr. Thirupathi N.', party: 'TVK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  // 12. Krishnagiri
  { number: 51, name: 'Uthangarai', district: 'Krishnagiri', type: 'SC', mla: 'N. Elaiyaraja', party: 'TVK', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  { number: 52, name: 'Bargur', district: 'Krishnagiri', type: 'General', mla: 'E.C. Govindarasan', party: 'ADMK', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  { number: 53, name: 'Krishnagiri', district: 'Krishnagiri', type: 'General', mla: 'Mukundhan P.', party: 'TVK', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  { number: 54, name: 'Veppanahalli', district: 'Krishnagiri', type: 'General', mla: 'Srinivasan P.S.', party: 'DMK', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  { number: 55, name: 'Hosur', district: 'Krishnagiri', type: 'General', mla: 'Balakrishnareddy P.', party: 'ADMK', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  { number: 56, name: 'Thalli', district: 'Krishnagiri', type: 'General', mla: 'Ramachandran T.', party: 'CPI', parliamentaryConstituency: 'Krishnagiri', source: 'Election Commission of India' },
  // 13. Dharmapuri
  { number: 57, name: 'Palacode', district: 'Dharmapuri', type: 'General', mla: 'Anbalagan K.P.', party: 'ADMK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  { number: 58, name: 'Pennagaram', district: 'Dharmapuri', type: 'General', mla: 'Gajendran S.', party: 'TVK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  { number: 59, name: 'Dharmapuri', district: 'Dharmapuri', type: 'General', mla: 'Anbumani', party: 'PMK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  { number: 60, name: 'Pappireddippatti', district: 'Dharmapuri', type: 'General', mla: 'Maragatham Vetrivel', party: 'ADMK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  { number: 61, name: 'Harur', district: 'Dharmapuri', type: 'SC', mla: 'Sampathkumar V.', party: 'ADMK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  // 14. Tiruvannamalai
  { number: 62, name: 'Chengam', district: 'Tiruvannamalai', type: 'SC', mla: 'S. Velu', party: 'ADMK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  { number: 63, name: 'Tiruvannamalai', district: 'Tiruvannamalai', type: 'General', mla: 'Velu E.V.', party: 'DMK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  { number: 64, name: 'Kilpennathur', district: 'Tiruvannamalai', type: 'General', mla: 'Ramachandran S.', party: 'ADMK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  { number: 65, name: 'Kalasapakkam', district: 'Tiruvannamalai', type: 'General', mla: 'Agri Krishnamurthy S.S.', party: 'ADMK', parliamentaryConstituency: 'Tiruvannamalai', source: 'Election Commission of India' },
  { number: 66, name: 'Polur', district: 'Tiruvannamalai', type: 'General', mla: 'Abishek R.', party: 'TVK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  { number: 67, name: 'Arani', district: 'Tiruvannamalai', type: 'General', mla: 'Jayasudha L.', party: 'ADMK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  { number: 68, name: 'Cheyyar', district: 'Tiruvannamalai', type: 'General', mla: 'Mukkur N. Subramanian', party: 'ADMK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  { number: 69, name: 'Vandavasi', district: 'Tiruvannamalai', type: 'SC', mla: 'Ambethkumar S.', party: 'DMK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  // 15. Viluppuram
  { number: 70, name: 'Gingee', district: 'Viluppuram', type: 'General', mla: 'Anbumani', party: 'PMK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  { number: 71, name: 'Mailam', district: 'Viluppuram', type: 'General', mla: 'Shanmugam C. Ve.', party: 'ADMK', parliamentaryConstituency: 'Arani', source: 'Election Commission of India' },
  { number: 72, name: 'Tindivanam', district: 'Viluppuram', type: 'SC', mla: 'Vanni Arasu', party: 'VCK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  { number: 73, name: 'Vanur', district: 'Viluppuram', type: 'SC', mla: 'Gowtham D.', party: 'DMK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  { number: 74, name: 'Villupuram', district: 'Viluppuram', type: 'General', mla: 'Lakshmanan R.', party: 'DMK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  { number: 75, name: 'Vikravandi', district: 'Viluppuram', type: 'General', mla: 'Sivakumar C.', party: 'PMK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  // 16. Kallakurichi
  { number: 76, name: 'Tirukkoyilur', district: 'Kallakurichi', type: 'General', mla: 'Palanisamy S.', party: 'ADMK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  { number: 77, name: 'Ulundurpettai', district: 'Kallakurichi', type: 'General', mla: 'Vasanthavel G.R.', party: 'DMK', parliamentaryConstituency: 'Viluppuram (SC)', source: 'Election Commission of India' },
  { number: 78, name: 'Rishivandiyam', district: 'Kallakurichi', type: 'General', mla: 'Karthikeyan K.', party: 'DMK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  { number: 79, name: 'Sankarapuram', district: 'Kallakurichi', type: 'General', mla: 'Rakesh R.', party: 'ADMK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  { number: 80, name: 'Kallakurichi', district: 'Kallakurichi', type: 'SC', mla: 'Arul Vignesh C.', party: 'TVK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  // 17. Salem
  { number: 81, name: 'Gangavalli', district: 'Salem', type: 'SC', mla: 'Nallathambi A.', party: 'ADMK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  { number: 82, name: 'Attur', district: 'Salem', type: 'SC', mla: 'Jayasankaran A.P.', party: 'ADMK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  { number: 83, name: 'Yercaud', district: 'Salem', type: 'ST', mla: 'Usharani P.', party: 'ADMK', parliamentaryConstituency: 'Kallakurichi', source: 'Election Commission of India' },
  { number: 84, name: 'Omalur', district: 'Salem', type: 'General', mla: 'Mani R.', party: 'ADMK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 85, name: 'Mettur', district: 'Salem', type: 'General', mla: 'Venkatachalam G.', party: 'ADMK', parliamentaryConstituency: 'Dharmapuri', source: 'Election Commission of India' },
  { number: 86, name: 'Edappadi', district: 'Salem', type: 'General', mla: 'Edappadi K. Palaniswami', party: 'ADMK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 87, name: 'Sankari', district: 'Salem', type: 'General', mla: 'Vetrivel S.', party: 'ADMK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 88, name: 'Salem West', district: 'Salem', type: 'General', mla: 'Lakshmanan S.', party: 'TVK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 89, name: 'Salem North', district: 'Salem', type: 'General', mla: 'Sivakumar K.', party: 'TVK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 90, name: 'Salem South', district: 'Salem', type: 'General', mla: 'Vijay Tamilan Parthiban A.', party: 'TVK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  { number: 91, name: 'Veerapandi', district: 'Salem', type: 'General', mla: 'Palanivel M.S.', party: 'TVK', parliamentaryConstituency: 'Salem', source: 'Election Commission of India' },
  // 18. Namakkal
  { number: 92, name: 'Rasipuram', district: 'Namakkal', type: 'SC', mla: 'Logesh Tamilselvan D.', party: 'TVK', parliamentaryConstituency: 'Namakkal', source: 'Election Commission of India' },
  { number: 93, name: 'Senthamangalam', district: 'Namakkal', type: 'ST', mla: 'P. Chandrasekar', party: 'TVK', parliamentaryConstituency: 'Namakkal', source: 'Election Commission of India' },
  { number: 94, name: 'Namakkal', district: 'Namakkal', type: 'General', mla: 'Dilip C.S.', party: 'TVK', parliamentaryConstituency: 'Namakkal', source: 'Election Commission of India' },
  { number: 95, name: 'Paramathi Velur', district: 'Namakkal', type: 'General', mla: 'Sekar S.', party: 'ADMK', parliamentaryConstituency: 'Namakkal', source: 'Election Commission of India' },
  { number: 96, name: 'Tiruchengodu', district: 'Namakkal', type: 'General', mla: 'Arunraj K.G.', party: 'TVK', parliamentaryConstituency: 'Namakkal', source: 'Election Commission of India' },
  { number: 97, name: 'Kumarapalayam', district: 'Namakkal', type: 'General', mla: 'C. Vijayalakshmi', party: 'TVK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  // 19. Erode
  { number: 98, name: 'Erode East', district: 'Erode', type: 'General', mla: 'M. Vijay Balaji', party: 'TVK', parliamentaryConstituency: 'Erode', source: 'Election Commission of India' },
  { number: 99, name: 'Erode West', district: 'Erode', type: 'General', mla: 'Ananth Moghan K.K.', party: 'TVK', parliamentaryConstituency: 'Erode', source: 'Election Commission of India' },
  { number: 100, name: 'Modakkurichi', district: 'Erode', type: 'General', mla: 'D. Shanmugan', party: 'TVK', parliamentaryConstituency: 'Erode', source: 'Election Commission of India' },
  // 20. Tiruppur
  { number: 101, name: 'Dharapuram', district: 'Tiruppur', type: 'SC', mla: 'Sathyabama P.', party: 'ADMK', parliamentaryConstituency: 'Erode', source: 'Election Commission of India' },
  { number: 102, name: 'Kangayam', district: 'Tiruppur', type: 'General', mla: 'NSN Nataraj', party: 'ADMK', parliamentaryConstituency: 'Erode', source: 'Election Commission of India' },
  // 21. Erode
  { number: 103, name: 'Perundurai', district: 'Erode', type: 'General', mla: 'Jayakumar S.', party: 'ADMK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 104, name: 'Bhavani', district: 'Erode', type: 'General', mla: 'Karuppanan K.C.', party: 'ADMK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 105, name: 'Anthiyur', district: 'Erode', type: 'General', mla: 'Haribaskar P.', party: 'ADMK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 106, name: 'Gobichettipalayam', district: 'Erode', type: 'General', mla: 'R. Vijaysaravanan', party: 'TVK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 107, name: 'Bhavanisagar', district: 'Erode', type: 'SC', mla: 'V.P. Tamilselvi', party: 'TVK', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  // 22. Nilgiris
  { number: 108, name: 'Udhagamandalam', district: 'Nilgiris', type: 'General', mla: 'Bhojarajan M.', party: 'BJP', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  { number: 109, name: 'Gudalur', district: 'Nilgiris', type: 'SC', mla: 'Dhravidamani M.', party: 'DMK', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  { number: 110, name: 'Coonoor', district: 'Nilgiris', type: 'General', mla: 'M. Raju', party: 'DMK', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  // 23. Coimbatore
  { number: 111, name: 'Mettupalayam', district: 'Coimbatore', type: 'General', mla: 'Sunilanand', party: 'TVK', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  // 24. Tiruppur
  { number: 112, name: 'Avanashi', district: 'Tiruppur', type: 'SC', mla: 'Kamali S.', party: 'TVK', parliamentaryConstituency: 'Nilgiris (SC)', source: 'Election Commission of India' },
  { number: 113, name: 'Tiruppur North', district: 'Tiruppur', type: 'General', mla: 'V. Sathyabama', party: 'TVK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 114, name: 'Tiruppur South', district: 'Tiruppur', type: 'General', mla: 'Balamurugan S.', party: 'TVK', parliamentaryConstituency: 'Tiruppur', source: 'Election Commission of India' },
  { number: 115, name: 'Palladam', district: 'Tiruppur', type: 'General', mla: 'K. Ramkumar', party: 'TVK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  // 25. Coimbatore
  { number: 116, name: 'Sulur', district: 'Coimbatore', type: 'General', mla: 'NM. Sukumar', party: 'TVK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  { number: 117, name: 'Kavundampalayam', district: 'Coimbatore', type: 'General', mla: 'Kanimozhi Santhosh', party: 'TVK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  { number: 118, name: 'Coimbatore North', district: 'Coimbatore', type: 'General', mla: 'V. Sampathkumar', party: 'TVK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  { number: 119, name: 'Thondamuthur', district: 'Coimbatore', type: 'General', mla: 'S.P. Velumani', party: 'ADMK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  { number: 120, name: 'Coimbatore South', district: 'Coimbatore', type: 'General', mla: 'V. Senthilbalaji', party: 'DMK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  { number: 121, name: 'Singanallur', district: 'Coimbatore', type: 'General', mla: 'K.S. Sri Giri Prasath', party: 'TVK', parliamentaryConstituency: 'Coimbatore', source: 'Election Commission of India' },
  { number: 122, name: 'Kinathukadavu', district: 'Coimbatore', type: 'General', mla: 'Vignesh K.', party: 'TVK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  { number: 123, name: 'Pollachi', district: 'Coimbatore', type: 'General', mla: 'K. Nithyanandhan', party: 'DMK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  { number: 124, name: 'Valparai', district: 'Coimbatore', type: 'SC', mla: 'Kutty (alias) Sudhakar A.', party: 'DMK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  // 26. Tiruppur
  { number: 125, name: 'Udumalaipettai', district: 'Tiruppur', type: 'General', mla: 'K.N. Nehru', party: 'DMK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  { number: 126, name: 'Madathukulam', district: 'Tiruppur', type: 'General', mla: 'R. Jayaramakrishnan', party: 'DMK', parliamentaryConstituency: 'Pollachi', source: 'Election Commission of India' },
  // 27. Dindigul
  { number: 127, name: 'Palani', district: 'Dindigul', type: 'General', mla: 'Ravimanoharan K.', party: 'ADMK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 128, name: 'Oddanchatram', district: 'Dindigul', type: 'General', mla: 'Sakkarapani R.', party: 'DMK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 129, name: 'Athoor', district: 'Dindigul', type: 'General', mla: 'I. Periyasamy', party: 'DMK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 130, name: 'Nilakkottai', district: 'Dindigul', type: 'SC', mla: 'Ayyanar R.', party: 'TVK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 131, name: 'Natham', district: 'Dindigul', type: 'General', mla: 'Natham Viswanathan R.', party: 'ADMK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 132, name: 'Dindigul', district: 'Dindigul', type: 'General', mla: 'Senthilkumar I.P.', party: 'DMK', parliamentaryConstituency: 'Dindigul', source: 'Election Commission of India' },
  { number: 133, name: 'Vedasandur', district: 'Dindigul', type: 'General', mla: 'Saminathan T.', party: 'DMK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  // 28. Karur
  { number: 134, name: 'Aravakurichi', district: 'Karur', type: 'General', mla: 'Elango R.', party: 'DMK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  { number: 135, name: 'Karur', district: 'Karur', type: 'General', mla: 'M.R. Vijayabhaskar', party: 'ADMK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  { number: 136, name: 'Krishnarayapuram', district: 'Karur', type: 'SC', mla: 'Sathya M.', party: 'TVK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  { number: 137, name: 'Kulithalai', district: 'Karur', type: 'General', mla: 'Suriyanur A. Chandran', party: 'DMK', parliamentaryConstituency: 'Perambalur', source: 'Election Commission of India' },
  // 29. Tiruchirappalli
  { number: 138, name: 'Manapparai', district: 'Tiruchirappalli', type: 'General', mla: 'R. Kathiravan', party: 'TVK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  { number: 139, name: 'Srirangam', district: 'Tiruchirappalli', type: 'General', mla: 'Ramesh', party: 'TVK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 140, name: 'Tiruchirappalli West', district: 'Tiruchirappalli', type: 'General', mla: 'K.N. Nehru', party: 'DMK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 141, name: 'Tiruchirappalli East', district: 'Tiruchirappalli', type: 'General', mla: 'C. Joseph Vijay', party: 'TVK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 142, name: 'Thiruverumbur', district: 'Tiruchirappalli', type: 'General', mla: 'Vijayakumar (A) Navalpattu S. Viji', party: 'TVK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 143, name: 'Lalgudi', district: 'Tiruchirappalli', type: 'General', mla: 'Leemarose Martin', party: 'ADMK', parliamentaryConstituency: 'Perambalur', source: 'Election Commission of India' },
  { number: 144, name: 'Manachanallur', district: 'Tiruchirappalli', type: 'General', mla: 'Kathiravan S.', party: 'DMK', parliamentaryConstituency: 'Perambalur', source: 'Election Commission of India' },
  { number: 145, name: 'Musiri', district: 'Tiruchirappalli', type: 'General', mla: 'M. Vignesh', party: 'TVK', parliamentaryConstituency: 'Perambalur', source: 'Election Commission of India' },
  { number: 146, name: 'Thuraiyur', district: 'Tiruchirappalli', type: 'SC', mla: 'Ravisankar M.', party: 'TVK', parliamentaryConstituency: 'Perambalur', source: 'Election Commission of India' },
  // 30. Perambalur
  { number: 147, name: 'Perambalur', district: 'Perambalur', type: 'SC', mla: 'Sivakumar K.', party: 'TVK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  { number: 148, name: 'Kunnam', district: 'Perambalur', type: 'General', mla: 'Sivasankar S.S.', party: 'DMK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  // 31. Ariyalur
  { number: 149, name: 'Ariyalur', district: 'Ariyalur', type: 'General', mla: 'Rajendran S.', party: 'ADMK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  { number: 150, name: 'Jayankondam', district: 'Ariyalur', type: 'General', mla: 'Sivakumar C.', party: 'PMK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  // 32. Cuddalore
  { number: 151, name: 'Tittakudi', district: 'Cuddalore', type: 'SC', mla: 'Ganesan C.V.', party: 'DMK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 152, name: 'Vridhachalam', district: 'Cuddalore', type: 'General', mla: 'Premalatha Vijayakant', party: 'DMDK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 153, name: 'Neyveli', district: 'Cuddalore', type: 'General', mla: 'Rajendran R.', party: 'ADMK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 154, name: 'Panruti', district: 'Cuddalore', type: 'General', mla: 'Mohan K.', party: 'ADMK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 155, name: 'Cuddalore', district: 'Cuddalore', type: 'General', mla: 'B. Rajkumar', party: 'TVK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 156, name: 'Kurinjipadi', district: 'Cuddalore', type: 'General', mla: 'M.R.K. Panneerselvam', party: 'DMK', parliamentaryConstituency: 'Cuddalore', source: 'Election Commission of India' },
  { number: 157, name: 'Bhuvanagiri', district: 'Cuddalore', type: 'General', mla: 'Arunmozhithevan A.', party: 'ADMK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  { number: 158, name: 'Chidambaram', district: 'Cuddalore', type: 'General', mla: 'Thamimun Ansari M.', party: 'DMK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  { number: 159, name: 'Kattumannarkoil', district: 'Cuddalore', type: 'SC', mla: 'L.E. Jothimani', party: 'VCK', parliamentaryConstituency: 'Chidambaram (SC)', source: 'Election Commission of India' },
  // 33. Mayiladuthurai
  { number: 160, name: 'Sirkazhi', district: 'Mayiladuthurai', type: 'SC', mla: 'Senthilselvan R.', party: 'DMK', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  { number: 161, name: 'Mayiladuthurai', district: 'Mayiladuthurai', type: 'General', mla: 'Jamal Mohamed Younoos Y.N.', party: 'INC', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  { number: 162, name: 'Poompuhar', district: 'Mayiladuthurai', type: 'General', mla: 'Nivedha M. Murugan', party: 'DMK', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  // 34. Nagapattinam
  { number: 163, name: 'Nagapattinam', district: 'Nagapattinam', type: 'General', mla: 'M.H. Jawahirullah', party: 'DMK', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  { number: 164, name: 'Kilvelur', district: 'Nagapattinam', type: 'SC', mla: 'Latha T.', party: 'CPI(M)', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  { number: 165, name: 'Vedaranyam', district: 'Nagapattinam', type: 'General', mla: 'Manian O.S.', party: 'ADMK', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  // 35. Tiruvarur
  { number: 166, name: 'Thiruthuraipoondi', district: 'Tiruvarur', type: 'SC', mla: 'Marimuthu K.', party: 'CPI', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  { number: 167, name: 'Mannargudi', district: 'Tiruvarur', type: 'General', mla: 'Kamaraj S.', party: 'AMMKMNKZ', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  { number: 168, name: 'Thiruvarur', district: 'Tiruvarur', type: 'General', mla: 'Kalaivanan Poondi K.', party: 'DMK', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  { number: 169, name: 'Nannilam', district: 'Tiruvarur', type: 'General', mla: 'Kamaraj R.', party: 'ADMK', parliamentaryConstituency: 'Nagapattinam (SC)', source: 'Election Commission of India' },
  // 36. Thanjavur
  { number: 170, name: 'Thiruvidaimarudur', district: 'Thanjavur', type: 'SC', mla: 'Govi. Chezhiaan', party: 'DMK', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  { number: 171, name: 'Kumbakonam', district: 'Thanjavur', type: 'General', mla: 'Vinoth', party: 'TVK', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  { number: 172, name: 'Papanasam', district: 'Thanjavur', type: 'General', mla: 'A.M. Shahjahan', party: 'IUML', parliamentaryConstituency: 'Mayiladuthurai', source: 'Election Commission of India' },
  { number: 173, name: 'Thiruvaiyaru', district: 'Thanjavur', type: 'General', mla: 'Durai. Chandrasekaran', party: 'DMK', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  { number: 174, name: 'Thanjavur', district: 'Thanjavur', type: 'General', mla: 'R. Vijaysaravanan', party: 'TVK', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  { number: 175, name: 'Orathanadu', district: 'Thanjavur', type: 'General', mla: 'R. Vaithilingam', party: 'DMK', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  { number: 176, name: 'Pattukkottai', district: 'Thanjavur', type: 'General', mla: 'Annadurai K.', party: 'DMK', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  { number: 177, name: 'Peravurani', district: 'Thanjavur', type: 'General', mla: 'Ashokkumar N.', party: 'DMK', parliamentaryConstituency: 'Thanjavur', source: 'Election Commission of India' },
  // 37. Pudukkottai
  { number: 178, name: 'Gandarvakkottai', district: 'Pudukkottai', type: 'SC', mla: 'N. Subramanian', party: 'TVK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 179, name: 'Viralimalai', district: 'Pudukkottai', type: 'General', mla: 'Vijayabaskar C.', party: 'ADMK', parliamentaryConstituency: 'Karur', source: 'Election Commission of India' },
  { number: 180, name: 'Pudukkottai', district: 'Pudukkottai', type: 'General', mla: 'V. Muthuraja', party: 'DMK', parliamentaryConstituency: 'Tiruchirappalli', source: 'Election Commission of India' },
  { number: 181, name: 'Thirumayam', district: 'Pudukkottai', type: 'General', mla: 'Regupathy S.', party: 'DMK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  { number: 182, name: 'Alangudi', district: 'Pudukkottai', type: 'General', mla: 'Siva V. Meyyanathan', party: 'DMK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  { number: 183, name: 'Aranthangi', district: 'Pudukkottai', type: 'General', mla: 'Mohamed Farvas J.', party: 'TVK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  // 38. Sivaganga
  { number: 184, name: 'Karaikudi', district: 'Sivaganga', type: 'General', mla: 'Dr. Prabhu T.K.', party: 'TVK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  { number: 185, name: 'Tiruppathur', district: 'Sivaganga', type: 'General', mla: 'Seenivasa Sethupathy R.', party: 'TVK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  { number: 186, name: 'Sivaganga', district: 'Sivaganga', type: 'General', mla: 'Kulandhai Rani A.', party: 'TVK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  { number: 187, name: 'Manamadurai', district: 'Sivaganga', type: 'SC', mla: 'Elangovan D.', party: 'TVK', parliamentaryConstituency: 'Sivaganga', source: 'Election Commission of India' },
  // 39. Madurai
  { number: 188, name: 'Melur', district: 'Madurai', type: 'General', mla: 'P. Viswanathan', party: 'INC', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 189, name: 'Madurai East', district: 'Madurai', type: 'General', mla: 'Karthikeyan S.', party: 'TVK', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 190, name: 'Sholavandan', district: 'Madurai', type: 'SC', mla: 'Karuppaiah M.V.', party: 'TVK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  { number: 191, name: 'Madurai North', district: 'Madurai', type: 'General', mla: 'A. Kallanai', party: 'TVK', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 192, name: 'Madurai South', district: 'Madurai', type: 'General', mla: 'M.M. Gopison', party: 'TVK', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 193, name: 'Madurai Central', district: 'Madurai', type: 'General', mla: 'Madhar Badhurudeen', party: 'TVK', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 194, name: 'Madurai West', district: 'Madurai', type: 'General', mla: 'Thangapandi SR', party: 'TVK', parliamentaryConstituency: 'Madurai', source: 'Election Commission of India' },
  { number: 195, name: 'Thiruparankundram', district: 'Madurai', type: 'General', mla: 'Nirmalkumar R.', party: 'TVK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 196, name: 'Thirumangalam', district: 'Madurai', type: 'General', mla: 'Manimaran M.', party: 'DMK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 197, name: 'Usilampatti', district: 'Madurai', type: 'General', mla: 'Vijay M.', party: 'TVK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  // 40. Theni
  { number: 198, name: 'Andipatti', district: 'Theni', type: 'General', mla: 'Maharajan A.', party: 'DMK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  { number: 199, name: 'Periyakulam', district: 'Theni', type: 'SC', mla: 'Sabari Iyngaran G.', party: 'TVK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  { number: 200, name: 'Bodinayakanur', district: 'Theni', type: 'General', mla: 'Panneerselvam O.', party: 'DMK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  { number: 201, name: 'Cumbum', district: 'Theni', type: 'General', mla: 'Jeganathmishra PLA', party: 'TVK', parliamentaryConstituency: 'Theni', source: 'Election Commission of India' },
  // 41. Virudhunagar
  { number: 202, name: 'Rajapalayam', district: 'Virudhunagar', type: 'General', mla: 'Jegadeshwari K.', party: 'TVK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 203, name: 'Srivilliputhur', district: 'Virudhunagar', type: 'SC', mla: 'Karthik A.', party: 'TVK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 204, name: 'Sattur', district: 'Virudhunagar', type: 'General', mla: 'Kadarkarairaj A.', party: 'DMK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 205, name: 'Sivakasi', district: 'Virudhunagar', type: 'General', mla: 'Keerthana S.', party: 'TVK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 206, name: 'Virudhunagar', district: 'Virudhunagar', type: 'General', mla: 'Selvam', party: 'TVK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 207, name: 'Aruppukottai', district: 'Virudhunagar', type: 'General', mla: 'Ramachandran K.K.S.S.R.', party: 'DMK', parliamentaryConstituency: 'Virudhunagar', source: 'Election Commission of India' },
  { number: 208, name: 'Tiruchuli', district: 'Virudhunagar', type: 'General', mla: 'Thangam Thenarasu', party: 'DMK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  // 42. Ramanathapuram
  { number: 209, name: 'Paramakudi', district: 'Ramanathapuram', type: 'SC', mla: 'Advocate Kathiravan K.K.', party: 'DMK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  { number: 210, name: 'Tiruvadanai', district: 'Ramanathapuram', type: 'General', mla: 'Rajeev', party: 'TVK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  { number: 211, name: 'Ramanathapuram', district: 'Ramanathapuram', type: 'General', mla: 'Katharbatcha Muthuramalingam', party: 'DMK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  { number: 212, name: 'Mudukulathur', district: 'Ramanathapuram', type: 'General', mla: 'R.S. Rajakannappan', party: 'DMK', parliamentaryConstituency: 'Ramanathapuram', source: 'Election Commission of India' },
  // 43. Thoothukudi
  { number: 213, name: 'Vilathikulam', district: 'Thoothukudi', type: 'General', mla: 'Markandayan G.V.', party: 'DMK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  { number: 214, name: 'Thoothukkudi', district: 'Thoothukudi', type: 'General', mla: 'Srinath', party: 'TVK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  { number: 215, name: 'Tiruchendur', district: 'Thoothukudi', type: 'General', mla: 'Anitha R. Radhakrishnan', party: 'DMK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  { number: 216, name: 'Srivaikuntam', district: 'Thoothukudi', type: 'General', mla: 'Saravanan G.', party: 'TVK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  { number: 217, name: 'Ottapidaram', district: 'Thoothukudi', type: 'SC', mla: 'P. Mathanraja', party: 'TVK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  { number: 218, name: 'Kovilpatti', district: 'Thoothukudi', type: 'General', mla: 'Karunanithi K.', party: 'DMK', parliamentaryConstituency: 'Thoothukkudi', source: 'Election Commission of India' },
  // 44. Tenkasi
  { number: 219, name: 'Sankarankovil', district: 'Tenkasi', type: 'SC', mla: 'Dr. Dhilipan Jaishankar', party: 'ADMK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 220, name: 'Vasudevanallur', district: 'Tenkasi', type: 'SC', mla: 'E. Raja', party: 'DMK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 221, name: 'Kadayanallur', district: 'Tenkasi', type: 'General', mla: 'Rajendran T.M.', party: 'DMK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 222, name: 'Tenkasi', district: 'Tenkasi', type: 'General', mla: 'Dr. Kalai Kathiravan', party: 'DMK', parliamentaryConstituency: 'Tenkasi (SC)', source: 'Election Commission of India' },
  { number: 223, name: 'Alangulam', district: 'Tenkasi', type: 'General', mla: 'Paul Manoj Pandian', party: 'DMK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  // 45. Tirunelveli
  { number: 224, name: 'Tirunelveli', district: 'Tirunelveli', type: 'General', mla: 'Murughan R.S.', party: 'TVK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  { number: 225, name: 'Ambasamudram', district: 'Tirunelveli', type: 'General', mla: 'Dr. Esakki Subaya', party: 'ADMK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  { number: 226, name: 'Palayamkottai', district: 'Tirunelveli', type: 'General', mla: 'M. Abdul Wahab', party: 'DMK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  { number: 227, name: 'Nanguneri', district: 'Tirunelveli', type: 'General', mla: 'Reddiarpatti V. Narayanan', party: 'TVK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  { number: 228, name: 'Radhapuram', district: 'Tirunelveli', type: 'General', mla: 'Dr. Sathish Christopher', party: 'TVK', parliamentaryConstituency: 'Tirunelveli', source: 'Election Commission of India' },
  // 46. Kanniyakumari
  { number: 229, name: 'Kanniyakumari', district: 'Kanniyakumari', type: 'General', mla: 'Thalavai Sundaram N.', party: 'DMK', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
  { number: 230, name: 'Nagercoil', district: 'Kanniyakumari', type: 'General', mla: 'Austin', party: 'DMK', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
  { number: 231, name: 'Colachel', district: 'Kanniyakumari', type: 'General', mla: 'Tharahai Cuthbert', party: 'INC', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
  { number: 232, name: 'Padmanabhapuram', district: 'Kanniyakumari', type: 'General', mla: 'Chellaswamy R.', party: 'CPI(M)', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
  { number: 233, name: 'Vilavancode', district: 'Kanniyakumari', type: 'General', mla: 'Praveen T.T.', party: 'INC', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
  { number: 234, name: 'Killiyoor', district: 'Kanniyakumari', type: 'General', mla: 'Rajesh Kumar S.', party: 'INC', parliamentaryConstituency: 'Kanniyakumari', source: 'Election Commission of India' },
];

// All 38 administrative districts containing assembly constituencies
export const ALL_DISTRICT_NAMES: string[] = Array.from(
  new Set(ASSEMBLY_CONSTITUENCIES.map((ac) => ac.district))
).sort((a, b) => a.localeCompare(b));

export interface DistrictAssemblyGroup {
  districtName: string;
  totalSeats: number;
  generalSeats: number;
  scSeats: number;
  stSeats: number;
  constituencies: AssemblyConstituency[];
}

export function getDistrictWiseAssemblyData(): DistrictAssemblyGroup[] {
  const map = new Map<string, AssemblyConstituency[]>();
  ASSEMBLY_CONSTITUENCIES.forEach((ac) => {
    const list = map.get(ac.district);
    if (list) {
      list.push(ac);
    } else {
      map.set(ac.district, [ac]);
    }
  });

  const groups: DistrictAssemblyGroup[] = [];
  map.forEach((constituencies, districtName) => {
    const sorted = [...constituencies].sort((a, b) => a.number - b.number);
    groups.push({
      districtName,
      totalSeats: sorted.length,
      generalSeats: sorted.filter((c) => c.type === 'General').length,
      scSeats: sorted.filter((c) => c.type === 'SC').length,
      stSeats: sorted.filter((c) => c.type === 'ST').length,
      constituencies: sorted,
    });
  });

  return groups.sort((a, b) => a.districtName.localeCompare(b.districtName));
}

export const ASSEMBLY_SUMMARY_METRICS = {
  totalSeats: 234,
  totalConstituencies: 234,
  totalDistricts: 38,
  generalSeats: 188,
  scReservedSeats: 44,
  stReservedSeats: 2,
  majorityMark: 118,
};

export const OFFICIAL_DATA_METADATA = {
  authority: 'Election Commission of India (ECI)',
  reportName: 'General Election to the Legislative Assembly of Tamil Nadu 2026 – Detailed Results',
  reportUrl: 'https://www.eci.gov.in/eci-backend/public/all_files/election_report/General_Election_to_the_Legislative_Assembly_of_Tamil_Nadu_2026_2026/10-Detailed_Results_1778165153.pdf',
  officialUrl: 'https://elections.tn.gov.in',
  lastVerified: '17 September 2026',
  lastUpdated: '17 September 2026',
  totalSeats: 234,
  delimitationOrder: 'Delimitation of Parliamentary and Assembly Constituencies Order, 2008 (Schedule XXVI)',
};

