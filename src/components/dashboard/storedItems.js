import React from 'react';
import "./dashboard.css"; // Assuming you have your CSS file for styling
import { PieChart } from '@mui/x-charts/PieChart';

function StoredItems({ user }) {

    const getCategoryCounts = (itemsArrays) => {
        const counts = {};
        itemsArrays.forEach(items => {
            items.forEach(item => {
                const category = item.foodID.foodCategory;
                counts[category] = (counts[category] || 0) + 1;
            });
        });
    
        return Object.entries(counts).map(([category, count]) => ({
            id: category,
            value: count,
            label: category,
        }));
    };
    
    // Get category counts from both fridges and freezers
    const allItems = [...user.fridges.flatMap(fridge => fridge.items), ...user.freezers.flatMap(freezer => freezer.items)];
    const combinedCategories = getCategoryCounts([allItems]);
    
   
    return (
        <div className="itemsWrapper" onClick={() => {console.log(user);}}>
            <div className="rightTopBarItem">
                <p>Stored Items</p>
                
              
            </div>
            <PieChart
                series={[
                    {
                        data: combinedCategories,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        innerRadius: "30%",
                        outerRadius: "80%",
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 180,
                        cx: "38%",
                        cy: "38%",
                      
                    }
                ]}
                slotProps={{
                    legend: {
                        
                    labelStyle: {
                        fontSize: "80%",
                        fill: 'black',
                        },
                      direction: 'column',
                      position: { vertical: 'top', horizontal: 'right' },
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      padding:32
                    },
                    
                  }}
            />
        </div>
    );
}

export default StoredItems;
