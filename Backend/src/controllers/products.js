import Products from "../models/products"
import Category from "../models/categories"
import unidecode from "unidecode"
export const getAllProduct = async (req, res) => {
  const {_page = 1, _order = "asc", _limit =40, _sort = "createdAt", _q=""} = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: { path: 'categoryId' }
  };
  const searchText = _q ? unidecode(_q) : ''; // Chuyển đổi chuỗi tìm kiếm thành không dấu

  try {
    let product;
    if (searchText) {
      product = await Products.paginate(
        { name: { $regex: searchText, $options: 'i' } },
        options
      );
    } else {
      product = await Products.paginate({}, options);
      // product = await Products.find( ).populate("categoryId");
            

    }

    return res.status(201).json({
      message: "Get all product successfully",
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const createProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body)
        //  Cách khác: Tìm và cập nhật danh mục
        //    await Category.findByIdAndUpdate(product.categoryId, {
        //     $push: { productId: product._id }
        // })
        const category = await Category.findById(product.categoryId)
        console.log(category);
        await category.productId.push(product._id)
         await category.save()

        return res.status(201).json({
            message: "Create product successfully",
            product
        })
        
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const updateProduct=async(req, res)=>{
    try {
       
        const { categoryId } = req.body;
        const product = await Products.findByIdAndUpdate(req.params.id,req.body);
   
          // Update new category
          await Category.findByIdAndUpdate(product.categoryId, {
            $pull: {
              productId: product._id,
            },
          });
         await Category.findByIdAndUpdate(categoryId, {
         
            $addToSet: {
              productId: product._id,
            },
          });
          
    
        return res.status(201).json({
            message: "Update product successfully",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const getOneProduct=async(req, res)=>{
    try {
        const product = await Products.findById(req.params.id).populate("categoryId")

        await product.populate("categoryId.productId")
        const limitedProducts = product.categoryId.productId.slice(0, 5);
       
        return res.status(201).json({
            message: "Get product successfully",
            product,
            cate:limitedProducts
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const removeProduct = async(req, res)=>{
    try {
         await Products.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            message: "Remove product successfully",
           
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const filterPrice=async(req, res)=>{
    const {_page = 1, _order = "asc", _limit = 8, _sort = "createAt", _q=""} = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
    };
    
    try {
      
    const  product = await Products.paginate({}, options);
    const {minPrice, maxPrice} = req.body
      console.log(minPrice,maxPrice);
      const filter = await product.docs.filter(item=>item.price>=minPrice && item.price <= maxPrice     
      )
      console.log("Lọc: ",filter);
      return res.status(201).json({
        message: "Get all product successfully",
        filter
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
export  const productOutstanding=async(req, res)=>{
    try {
      const product = await Products.find({outstanding:true, categoryId:req.params.idCate})
      const limitProduct = product.slice(0, 5)
      return res.status(201).json({
        message: "Get product completed",
        limitProduct
      });
    
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }

  }
  export const filterCategory=async(req, res)=>{
    const {_page = 1, _order = "asc", _limit = 8, _sort = "createAt", _q=""} = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
    };
    
    try {
      
    const  product = await Products.paginate({}, options);
    const {minPrice, maxPrice} = req.body
      console.log(minPrice,maxPrice);
      const filter = await product.docs.filter(item=>item.price>=minPrice && item.price <= maxPrice     
      )
      console.log("Lọc: ",filter);
      return res.status(201).json({
        message: "Get all product successfully",
        filter
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
