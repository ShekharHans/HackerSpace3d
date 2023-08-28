import React, { Component } from "react";


export class App extends Component {
    state = {
        carouselDeg: 17,
        itemDeg: -17,
        centerItem: 0,
        prevItem: 9,
        lastItem: 9,
        nextItem: 1,
        carousel: [
            { name: "Inspiration", id: 0, position: 1 },
            { name: "Innovation", id: 1, position: 2 },
            { name: "Diversity", id: 2, position: 3 },
            { name: "Events", id: 3, position: 4 },
            { name: "Workshops", id: 4, position: 5 },
        ]
    };

    getIdItems = side => {
        // true = next, false = prev
        const { nextItem, prevItem, lastItem } = this.state;

        if (side) {
            this.setState(
                {
                    centerItem: nextItem
                },
                () => prevNext(this.state.centerItem)
            );
        } else {
            this.setState(
                {
                    centerItem: prevItem
                },
                () => prevNext(this.state.centerItem)
            );
        }

        const prevNext = itemId => {
            if (itemId === lastItem) {
                this.setState({
                    nextItem: 0,
                    prevItem: lastItem - 1
                });
            } else if (itemId === 0) {
                this.setState({
                    prevItem: lastItem,
                    nextItem: 1
                });
            } else {
                this.setState(state => ({
                    nextItem: state.centerItem + 1,
                    prevItem: state.centerItem - 1
                }));
            }
        };
    };



    // 36

    render() {
        return (
            <div className="Circle">
                <div className="test" />
                <div
                    className="carousel"
                    style={{ transform: `rotate(${this.state.carouselDeg}deg)` }}
                >
                    {this.state.carousel.map((item, index) => (
                        <div
                            className={`item-carousel`}
                            key={item.id}
                            id={item.id}
                            style={{ transform: `rotate(${this.state.itemDeg}deg)` }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
