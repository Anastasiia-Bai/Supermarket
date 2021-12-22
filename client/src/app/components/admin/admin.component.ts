import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/Categories';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public form: FormGroup;
  public categories: Categories[] = [];
  public editedProduct: Product;
  public selectedFile: File = null;

  constructor(private productService: ProductService, public fb: FormBuilder, public adminService: AdminService, 
              public shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryId: ["", Validators.required],
      productName: ["", Validators.required],
      price: ["", [Validators.required]],
      image: [""],
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  public onAddProductClicked() {
    this.adminService.addProductForm = true;
    this.adminService.onEditProductClicked = false;
  }

  public onEditProductClicked() {
    if (this.form.invalid) {
      alert("Some product data invalid");
      return;
    }
    
    if (this.form.value.productName && this.form.value.price && this.form.value.categoryId) {
      const observable = this.adminService.editProduct(this.form.value, this.adminService.productId);
      observable.subscribe((responseData: any) => {
        location.reload();
        alert("Product Updated Successfully");
      });
    } else {
      alert("Failed To Update Product");
    }
    this.form.reset();
  }

  onSaveProduct() {
    this.onUploadImage();

    if (this.form.invalid) {
      alert("Some product data invalid");
      return;
    }

    this.form.value.image = this.selectedFile.name;
    let categoryId = this.form.value.categoryId;
    
    if (this.form.value.productName && this.form.value.price && this.form.value.categoryId && this.form.value.image) {
      const observable = this.adminService.addProduct(this.form.value);
      observable.subscribe((responseData: any) => {
        this.shareDataService.getCurrentCategoryProducts(this.categories[categoryId - 1].categoryId);
        alert("Product Added Successfully");
      });
    } else {
      alert("Failed To Add Product");
    }
    this.form.reset();
  }

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);

  }

  public onUploadImage() {
    const fd = new FormData();
    if (this.selectedFile.name != null && this.selectedFile.name != '') {
      fd.append('file', this.selectedFile, this.selectedFile.name);
      const observable2 = this.adminService.upload(fd);
      observable2.subscribe((event: any) => {
        console.log(event, "Image Uploaded");
      });
    } else {
      console.log('error 100!');
    }
  }
}