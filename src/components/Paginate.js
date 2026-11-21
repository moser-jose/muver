import Paginate from 'react-paginate'
// o react-paginate 8 só publica UMD: no Vite o import default pode vir como { default: Componente }
export default Paginate.default || Paginate
