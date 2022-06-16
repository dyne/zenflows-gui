import React from 'react';

type BrTableProps = {
    headArray:Array<string>,
    children:React.ReactNode
}

const BrTable = ({headArray, children}:BrTableProps) => {

  return (<>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        {headArray.map((p)=><th key={p}>{p}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    </>
  );
}

export default BrTable