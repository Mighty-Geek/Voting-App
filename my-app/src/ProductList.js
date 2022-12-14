import React from 'react';
import Product from './Product';
import products from './seed';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    }

    componentDidMount() {
        this.setState({ products });
    }

    handleProductUpVote(productId) {
        // console.log(`${productId} was upvoted.`);
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            } else {
                return product;
            }
        });
        this.setState({
            products: nextProducts,
        })
    }
    render() {
        this.state.products.sort((a, b) => (
            b.votes - a.votes
        ));
        const productComponents = this.state.products.map((product) => (
            <Product
                key={'product-' + product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote={this.handleProductUpVote}
            />
        ))
        return (
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        );
    }
}

export default ProductList;