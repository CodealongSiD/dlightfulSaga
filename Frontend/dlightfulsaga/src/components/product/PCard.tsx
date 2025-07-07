import Navbar from "@/layout/Navbar";

const PCard = () => {
    return(
      <section>
        <Navbar />
        <div className="!p-6">
            <div className="flex flex-col md:flex-row gap-3">
                <img src="https://via.placeholder.com/300x400?text=Book+6" alt="Book Image" className="!flex-1 items-center justify-center"/>
                <div className="!flex-1 items-center justify-center">
                    <h3>Book Name</h3>
                    <h4>Author Name</h4>
                    <p>Short Description</p>
                </div> 
            </div>

            <div className="flex flex-col gap-3">
                <div className=" flex flex-wrap items-center justify-end gap-3">
                    <button className="bg-emerald-800 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                        Buy Now
                    </button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                        Add to Cart
                    </button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
                        Whislist
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                    <h4>Description</h4>
                    <p> Long Description</p>
                    <h3>Author Name</h3>
                    <p> About Author</p>
                    </div>
                    <div className="flex-1">
                    <p>Language</p>
                    <p>Ratings</p>
                    <p>PaperBack/Hardcover <a href="#">buy on Amazon</a></p>  
                    </div>                  
                </div>
            
            </div>
        </div>

      </section>
    );
};

export default PCard;