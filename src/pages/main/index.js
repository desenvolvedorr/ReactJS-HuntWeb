import React, { Component } from 'react';

import api from '../../services/api';
import { Link } from 'react-router-dom';


import './styles.css';

export default class Main extends Component {
    //state é sempre um objeto 
    // a variavel products é iniciada vazia sempre que houver uma alteração o 
    //render é executado novamente
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }
    //componentDidMount -> metodo executado assim que o componente for mostrado em tela
    componentDidMount() {
        this.loadProducts();
    }

    //acessando a api / endpoint
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        //docs recebe o conteudo de docs e productInfo o restante
        const { docs, ...productInfo } = response.data;

        //setState altera/preenche a variavel/state
        this.setState({ products: docs, productInfo, page });
    }; 

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);

    }
    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
            {/* map para percorrer  */}
                {products.map(products => (
                    <article key={products._id}>
                        <strong>{products.title}</strong>
                        <p>{products.description}</p>

                        <Link to={`/products/${products._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}